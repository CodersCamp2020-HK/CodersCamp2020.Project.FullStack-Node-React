import ApiError from '@infrastructure/ApiError';
import { IAuthUserInfoRequest, IUserInfo } from '@infrastructure/Auth';
import PaginationParams from '@infrastructure/Pagination';
import Animal from '@infrastructure/postgres/Animal';
import FormAnimalAnswer from '@infrastructure/postgres/FormAnimalAnswer';
import FormAnimalSubmission, { AnimalFormStatus } from '@infrastructure/postgres/FormAnimalSubmission';
import { AnswerForm } from '@infrastructure/postgres/FormQuestion';
import OrganizationUser, { UserType } from '@infrastructure/postgres/OrganizationUser';
import { Repository } from 'typeorm';
import OptionalWhereSelectQueryBuilder from 'utils/OptionalWhereSelectQueryBuilder';

export enum FormStatus {
    IN_PROGRESS = 'inProgress',
    REJECTED = 'rejected',
    ACCEPTED = 'accepted',
}

interface GetAllAnimalSubmissionsParams {
    specie?: string;
    submissionDate?: Date;
    status?: AnimalFormStatus;
    animalName?: string;
    userName?: string;
    reviewerName?: string;
}

/**
 * Show the number of adopters wanting to adopt given animal
 */
export interface AdoptersCount {
    description: string;
    count: number;
}

interface GetAllAnimalSubmissionsParams {
    submissionDate?: Date;
    specie?: string;
    status?: AnimalFormStatus;
    animalName?: string;
    userName?: string;
    reviewerName?: string;
}

export interface ChangeStatusForAdoptionFormParams {
    status: AnimalFormStatus;
    submissionId: number;
}

interface AnimalAnswer {
    questionId: number;
    answer: AnswerForm;
}

export interface PostAnimalSubmissionParams {
    animalId: number;
    stepNumber: number;
    answers: AnimalAnswer[];
}

export class AnimalSubmissionsService {
    constructor(
        private animalSubmissionRepository: Repository<FormAnimalSubmission>,
        private animalRepository: Repository<Animal>,
        private animalAnswerRepository: Repository<FormAnimalAnswer>,
        private organizationUserRepository: Repository<OrganizationUser>,
    ) {}

    public async adoptWillingnessCounter(petName: string): Promise<AdoptersCount> {
        const count = await this.animalSubmissionRepository
            .createQueryBuilder('submission')
            .select()
            .leftJoinAndSelect('submission.animal', 'animal')
            .where('animal.name = :petName', { petName: petName })
            .getCount();

        return {
            description: 'Adopters willing to adopt a given animal',
            count,
        };
    }

    public async getAllAnimalSubmissions(
        queryParams: GetAllAnimalSubmissionsParams,
        currentUser: IUserInfo,
        paginationParams?: PaginationParams,
    ): Promise<FormAnimalSubmission[]> {
        if (currentUser.role == UserType.NORMAL || currentUser.role == UserType.VOLUNTEER) {
            const submissions = await this.animalSubmissionRepository
                .createQueryBuilder('submission')
                .leftJoinAndSelect('submission.animal', 'animal')
                .leftJoinAndSelect('submission.applicant', 'applicant')
                .leftJoinAndSelect('submission.answers', 'answers')
                .leftJoinAndSelect('answers.question', 'question')
                .where('applicant.id = :id', { id: currentUser.id })
                .select([
                    'animal.name',
                    'submission.status',
                    'submission.reason',
                    'submission.reviewer',
                    'submission.submissionDate',
                    'submission.reviewDate',
                    'question.question',
                ])
                .getMany();

            if (submissions.length === 0)
                throw new ApiError('Not Found', 404, `User with id: ${currentUser.id} does'nt have any submissions!`);
            return submissions;
        }

        let isFirstPage;
        let SKIP;
        let LIMIT;
        if (paginationParams) {
            isFirstPage = paginationParams.page === 1 ? true : false;
            SKIP =
                paginationParams.perPage && paginationParams.page
                    ? paginationParams.perPage * paginationParams.page - 1
                    : 0;
            LIMIT = paginationParams.perPage ? paginationParams.perPage : undefined;
        }

        const submissions = await new OptionalWhereSelectQueryBuilder(
            this.animalSubmissionRepository
                .createQueryBuilder('submission')
                .leftJoinAndSelect('submission.animal', 'animal')
                .leftJoinAndSelect('animal.specie', 'specie')
                .leftJoinAndSelect('submission.answers', 'answers')
                .leftJoinAndSelect('answers.question', 'question')
                .leftJoinAndSelect('submission.applicant', 'applicant')
                .select([
                    'applicant.id',
                    'applicant.name',
                    'applicant.surname',
                    'applicant.mail',
                    'applicant.phone',
                    'submission.id',
                    'submission.status',
                    'submission.reason',
                    'animal.id',
                    'specie.specie',
                    'animal.age',
                    'question.question',
                    'answers.answer',
                ])
                .skip(isFirstPage ? 0 : SKIP)
                .limit(LIMIT),
        )
            .optAndWhere('submission.status = ', queryParams.status)
            .optAndWhere('submission.submissionDate = ', queryParams.submissionDate)
            .optAndWhere('animal.name = ', queryParams.animalName)
            .optAndWhere('animal.specie = ', queryParams.specie)
            .optAndWhere('applicant.name = ', queryParams.userName)
            .optAndWhere('reviewer.name = ', queryParams.reviewerName)
            .selectQueryBuilder.getMany();

        if (submissions.length === 0) throw new ApiError('Not Found', 404, 'Submissions not found');
        return submissions;
    }

    public async changeStatusForAdoptionForm(
        { status, submissionId }: ChangeStatusForAdoptionFormParams,
        user: IUserInfo,
    ): Promise<void> {
        const submission = await this.animalSubmissionRepository.findOne(submissionId, { relations: ['reviewer'] });
        if (!submission) throw new ApiError('Not Found', 404, `Submission with id: ${submissionId} not found!`);
        const organizationUser = await this.organizationUserRepository.findOne(
            {
                user: { id: user.id },
                organization: { id: 1 },
            },
            { relations: ['organization', 'user'] },
        );
        if (!organizationUser) throw new ApiError('Not Found', 404, `Organization user not found!`);
        const updatedSubmission = {
            id: submission.id,
            status: status,
            reviewer: {
                user: { id: organizationUser.user.id },
                organization: { id: organizationUser.organization.id },
            },
            reviewDate: new Date(),
        };
        this.animalSubmissionRepository.save(updatedSubmission);
    }

    public async getAnimalSubmission(id: number, currentUser: IUserInfo): Promise<FormAnimalSubmission> {
        if (currentUser.role == UserType.NORMAL || currentUser.role == UserType.VOLUNTEER) {
            if (id != currentUser.id) {
                throw new ApiError('Unauthorized', 401, 'User and volunteer can only get own submission');
            }
        }
        const submission = await this.animalSubmissionRepository
            .createQueryBuilder('submission')
            .leftJoinAndSelect('submission.animal', 'animal')
            .leftJoinAndSelect('submission.applicant', 'applicant')
            .leftJoinAndSelect('submission.answers', 'answers')
            .leftJoinAndSelect('answers.question', 'question')
            .where('submission.id = :id', { id })
            .select([
                'animal.name',
                'submission.status',
                'submission.reason',
                'submission.reviewer',
                'submission.submissionDate',
                'submission.reviewDate',
                'question',
                'answers',
            ])
            .getOne();

        if (!submission) throw new ApiError('Not Found', 404, `Submission with ${id} not found`);

        return submission;
    }

    public async createAnimalSubmission(
        { animalId, answers, stepNumber }: PostAnimalSubmissionParams,
        request: IAuthUserInfoRequest,
    ): Promise<void> {
        answers;
        const user = request.user as IUserInfo;
        const animal = await this.animalRepository.findOne(animalId, { relations: ['specie'] });
        if (!animal) throw new ApiError('Not Found', 404, `Animal with ${animalId} not found!`);

        const isSubmission = await this.animalSubmissionRepository.findOne({
            animal: { id: animalId },
            applicant: { id: user.id },
            adoptionStep: {
                organization: { id: 1 },
                specie: { id: animal.specie.id },
                number: stepNumber,
            },
        });
        if (isSubmission) throw new ApiError('Bad Request', 400, 'Submission already exists!');

        const answersList: FormAnimalAnswer[] = [];
        for (const obj of answers) {
            const submissionAnswer = this.animalAnswerRepository.create({
                question: { id: obj.questionId },
                answer: obj.answer,
            });
            answersList.push(submissionAnswer);
        }

        const submission = this.animalSubmissionRepository.create({
            animal: { id: animalId },
            applicant: { id: user.id },
            adoptionStep: {
                organization: { id: 1 },
                specie: { id: animal.specie.id },
                number: stepNumber,
            },
        });
        submission.answers = answersList;

        await this.animalSubmissionRepository.save(submission);
    }
}
