import ApiError from '@infrastructure/ApiError';
import { IAuthUserInfoRequest, IUserInfo } from '@infrastructure/Auth';
import { AnswerForm } from '@infrastructure/postgres/FormQuestion';
import FormVolunteerAnswer from '@infrastructure/postgres/FormVolunteerAnswer';
import FormVolunteerSubmission, { VolunteerFormStatus } from '@infrastructure/postgres/FormVolunteerSubmission';
import { Repository } from 'typeorm';
import OptionalWhereSelectQueryBuilder from 'utils/OptionalWhereSelectQueryBuilder';

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

interface VolunteerAnswer {
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
    ) {}

    public async changeStatusForVolunteerForm(changeStatusParams: ChangeStatusForVolunterFormParams): Promise<void> {
        await this.volunteerSubmissionRepository
            .createQueryBuilder()
            .update()
            .set({ status: changeStatusParams.status })
            .where('userId = :id', { id: changeStatusParams.userId })
            .execute();
        return;
    }

    public async getAllSubmissions(queryParams: SubmissionQueryParams): Promise<FormVolunteerSubmission[]> {
        const submissions = await new OptionalWhereSelectQueryBuilder(
            this.volunteerSubmissionRepository
                .createQueryBuilder('submission')
                .leftJoinAndSelect('submission.user', 'user')
                .leftJoinAndSelect('submission.reviewer', 'reviewer')
                .leftJoinAndSelect('submission.answers', 'answers'),
        )
            .optAndWhere('submission.status = ', queryParams.status)
            .optAndWhere('submission.submissionDate = ', queryParams.submissionDate)
            .optAndWhere('user.name = ', queryParams.userName)
            .optAndWhere('reviewer.name = ', queryParams.reviewerName)
            .selectQueryBuilder.getMany();

        if (submissions.length === 0) throw new ApiError('Not Found', 404, 'Submissions not found');

        return submissions;
    }

    public async getVolunteerSubmission(id: number): Promise<FormVolunteerSubmission> {
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
        const user = request.user as IUserInfo;
        const submission = this.volunteerSubmissionRepository.create({
            user: { id: user.id },
            step: {
                organization: { id: 1 },
                number: stepNumber,
            },
        });
        await this.volunteerSubmissionRepository.save(submission);

        const answersList: FormVolunteerAnswer[] = [];
        for (const obj of answers) {
            const submissionAnswer = this.volunteerAnswerRepository.create({
                submission: { id: submission.id },
                question: { id: obj.question },
                answer: obj.answer,
            });
            answersList.push(submissionAnswer);
        }

        submission.answers = answersList;
        this.volunteerSubmissionRepository.save(submission);
    }
}
