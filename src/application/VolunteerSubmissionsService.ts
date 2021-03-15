import ApiError from '@infrastructure/ApiError';
import { IUserInfo } from '@infrastructure/Auth';
import FormVolunteerSubmission, { VolunteerFormStatus } from '@infrastructure/postgres/FormVolunteerSubmission';
import { UserType } from '@infrastructure/postgres/OrganizationUser';
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

export class VolunteerSubmissionsService {
    constructor(private volunteerSubmissionRepository: Repository<FormVolunteerSubmission>) {}

    public async changeStatusForVolunteerForm(changeStatusParams: ChangeStatusForVolunterFormParams): Promise<void> {
        await this.volunteerSubmissionRepository
            .createQueryBuilder()
            .update()
            .set({ status: changeStatusParams.status })
            .where('userId = :id', { id: changeStatusParams.userId })
            .execute();
        return;
    }

    public async getAllSubmissions(
        queryParams: SubmissionQueryParams,
        currentUser: IUserInfo,
    ): Promise<FormVolunteerSubmission[]> {
        console.log(currentUser);
        // if (currentUser.role == UserType.NORMAL || currentUser.role == UserType.VOLUNTEER) {
        //     const submission = await this.volunteerSubmissionRepository
        //         .createQueryBuilder('submission')
        //         .leftJoinAndSelect('submission.user', 'user')
        //         .where('user.id = :id', { id: currentUser.id })
        //         .getOne();

        //     // if (submission?.user.id != currentUser.id) {
        //     //     throw new ApiError('Unauthorized', 401, 'User and volunteer can only get own submissions');
        //     // }
        // }

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
}
