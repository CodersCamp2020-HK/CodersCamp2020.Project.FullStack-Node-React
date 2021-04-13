import ApiError from '@infrastructure/ApiError';
import { IAuthUserInfoRequest, IUserInfo } from '@infrastructure/Auth';
import PaginationParams from '@infrastructure/Pagination';
import { AnswerForm } from '@infrastructure/postgres/FormQuestion';
import FormVolunteerAnswer from '@infrastructure/postgres/FormVolunteerAnswer';
import FormVolunteerSubmission, { VolunteerFormStatus } from '@infrastructure/postgres/FormVolunteerSubmission';
import OrganizationUser, { UserType } from '@infrastructure/postgres/OrganizationUser';
import VolunteerHireStep from '@infrastructure/postgres/VolunteerHireStep';
import { Repository } from 'typeorm';
import { Inject } from 'typescript-ioc';
import hasDuplicates from 'utils/HasDuplicates';
import OptionalWhereSelectQueryBuilder from 'utils/OptionalWhereSelectQueryBuilder';
import { UsersService } from './UsersService';
import { VolunteerHireStepService } from './VolunteerHireStepService';

export interface ChangeStatusForVolunterFormParams {
    status: VolunteerFormStatus;
    userId: number;
}

interface SubmissionQueryParams {
    submissionDate?: Date;
    status?: VolunteerFormStatus;
    userName?: string;
    reviewerName?: string;
}

export interface VolunteerAnswer {
    question: number;
    answer: AnswerForm;
}

export interface PostVolunteerSubmissionParams {
    stepNumber: number;
    answers: VolunteerAnswer[];
}

export class VolunteerSubmissionsService {
    constructor(
        private volunteerSubmissionRepository: Repository<FormVolunteerSubmission>,
        private volunteerAnswerRepository: Repository<FormVolunteerAnswer>,
        private organizationUserRepository: Repository<OrganizationUser>,
        private volunteerHireStepRepository: Repository<VolunteerHireStep>,
    ) {}
    @Inject
    private usersService!: UsersService;
    @Inject
    private volunteerHireStepService!: VolunteerHireStepService;

    public async changeStatusForVolunteerForm(
        changeStatusParams: ChangeStatusForVolunterFormParams,
        user: IUserInfo,
    ): Promise<void> {
        const submission = await this.volunteerSubmissionRepository.findOne(
            { user: { id: changeStatusParams.userId } },
            {
                relations: ['reviewer', 'user'],
            },
        );
        if (!submission)
            throw new ApiError('Not Found', 404, `Submission with user id: ${changeStatusParams.userId} not found!`);

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
            status: changeStatusParams.status,
            reviewer: {
                user: { id: organizationUser.user.id },
                organization: { id: organizationUser.organization.id },
            },
            reviewDate: new Date(),
        };

        const currentStep = submission.user.volunteerStep;
        if (changeStatusParams.status === VolunteerFormStatus.ACCEPTED) {
            const steps = await this.volunteerHireStepService.getAll();
            if (steps.length > 0 && currentStep + 1 < steps.length) {
                await this.usersService.updateFormSteps(user.id, { volunteerStep: currentStep + 1 }, user);
            }
        }

        this.volunteerSubmissionRepository.save(updatedSubmission);
    }

    public async getAllSubmissions(
        queryParams: SubmissionQueryParams,
        paginationParams?: PaginationParams,
    ): Promise<FormVolunteerSubmission[]> {
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
            this.volunteerSubmissionRepository
                .createQueryBuilder('submission')
                .leftJoinAndSelect('submission.user', 'user')
                .leftJoinAndSelect('submission.reviewer', 'reviewer')
                .leftJoinAndSelect('submission.answers', 'answers')
                .skip(isFirstPage ? 0 : SKIP)
                .limit(LIMIT),
        )
            .optAndWhere('submission.status = ', queryParams.status)
            .optAndWhere('submission.submissionDate = ', queryParams.submissionDate)
            .optAndWhere('user.name = ', queryParams.userName)
            .optAndWhere('reviewer.name = ', queryParams.reviewerName)
            .selectQueryBuilder.getMany();

        if (submissions.length === 0) throw new ApiError('Not Found', 404, 'Submissions not found');

        return submissions;
    }

    public async getVolunteerSubmission(id: number, currentUser: IUserInfo): Promise<FormVolunteerSubmission> {
        if (currentUser.role == UserType.NORMAL || currentUser.role == UserType.VOLUNTEER) {
            if (id != currentUser.id) {
                throw new ApiError('Unauthorized', 401, 'User and volunteer can only get own submission');
            }
        }

        const submission = await this.volunteerSubmissionRepository.findOne(id, {
            relations: ['user', 'step', 'reviewer', 'answers'],
        });

        if (!submission) throw new ApiError('Not Found', 404, `Submission with ${id} not found`);

        return submission;
    }

    public async createVolunteerSubmission(
        { stepNumber, answers }: PostVolunteerSubmissionParams,
        request: IAuthUserInfoRequest,
    ): Promise<void> {
        if (hasDuplicates(answers)) throw new ApiError('Bad Request', 400, `Question's ids must be unique!`);
        const user = request.user as IUserInfo;
        const isSubmission = await this.volunteerSubmissionRepository.findOne({
            user: { id: user.id },
            step: {
                organization: { id: 1 },
                number: stepNumber,
            },
        });
        if (isSubmission) throw new ApiError('Bad Request', 400, 'Submission already exists!');

        const answersList: FormVolunteerAnswer[] = [];
        for (const obj of answers) {
            const submissionAnswer = this.volunteerAnswerRepository.create({
                question: { id: obj.question },
                answer: obj.answer,
            });
            answersList.push(submissionAnswer);
        }

        const submission = this.volunteerSubmissionRepository.create({
            user: { id: user.id },
            step: {
                organization: { id: 1 },
                number: stepNumber,
            },
            answers: answersList,
        });

        const nextStep = await this.volunteerHireStepRepository.findOne({
            where: { number: stepNumber + 1 },
        });
        if (nextStep) await this.usersService.updateFormSteps(user.id, { volunteerStep: stepNumber + 1 }, user);

        await this.volunteerSubmissionRepository.save(submission);
    }
}
