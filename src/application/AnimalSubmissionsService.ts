import ApiError from '@infrastructure/ApiError';
import { IAuthUserInfoRequest, IUserInfo } from '@infrastructure/Auth';
import FormAnimalSubmission, { AnimalFormStatus } from '@infrastructure/postgres/FormAnimalSubmission';
import { UserType } from '@infrastructure/postgres/OrganizationUser';
import { Repository } from 'typeorm';
import OptionalWhereSelectQueryBuilder from 'utils/OptionalWhereSelectQueryBuilder';

export enum FormStatus {
    IN_PROGRESS = 'inProgress',
    REJECTED = 'rejected',
    ACCEPTED = 'accepted',
}

interface getAllAnimalSubmissionsParams {
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

interface getAllAnimalSubmissionsParams {
    submissionDate?: Date;
    specie?: string;
    status?: AnimalFormStatus;
    animalName?: string;
    userName?: string;
    reviewerName?: string;
}

export interface ChangeStatusForAdoptionFormParams {
    status: AnimalFormStatus;
    userId: number;
    animalId: number;
}

export class AnimalSubmissionsService {
    constructor(private animalSubmissionRepository: Repository<FormAnimalSubmission>) {}

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
        queryParams: getAllAnimalSubmissionsParams,
        currentUser: IUserInfo,
    ): Promise<FormAnimalSubmission[]> {
        if (currentUser.role == UserType.NORMAL || currentUser.role == UserType.VOLUNTEER) {
            const submission = await this.animalSubmissionRepository
                .createQueryBuilder('submission')
                .leftJoinAndSelect('submission.applicant', 'applicant')
                .where('applicant.id = :id', { id: currentUser.id })
                .getOne();

            if (submission?.applicant.id != currentUser.id) {
                throw new ApiError('Unauthorized', 401, 'User and volunteer can only get their submissions');
            }
        }
        const submissions = await new OptionalWhereSelectQueryBuilder(
            this.animalSubmissionRepository
                .createQueryBuilder('submission')
                .leftJoinAndSelect('submission.animal', 'animal')
                .leftJoinAndSelect('submission.applicant', 'applicant')
                .leftJoinAndSelect('submission.reviewer', 'reviewer'),
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

    public async changeStatusForAdoptionForm(changeStatusParams: ChangeStatusForAdoptionFormParams): Promise<void> {
        await this.animalSubmissionRepository
            .createQueryBuilder()
            .update()
            .set({ status: changeStatusParams.status })
            .where('applicantId = :id', { id: changeStatusParams.userId })
            .andWhere('animalId = :id', { id: changeStatusParams.animalId })
            .execute();
        return;
    }

    public async getAnimalSubmission(id: number): Promise<FormAnimalSubmission> {
        const submission = await this.animalSubmissionRepository.findOne(id, {
            relations: ['animal', 'applicant', 'answers', 'reviewer'],
        });

        if (!submission) throw new ApiError('Not Found', 404, `Submission with ${id} not found`);

        return submission;
    }
}
