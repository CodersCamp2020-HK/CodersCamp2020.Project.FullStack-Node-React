import { ValidateErrorJSON } from '@application/UsersErrors';
import {
    ChangeStatusForVolunterFormParams,
    PostVolunteerSubmissionParams,
    VolunteerSubmissionsService,
} from '@application/VolunteerSubmissionsService';
import ApiError from '@infrastructure/ApiError';
import { IAuthUserInfoRequest, IUserInfo } from '@infrastructure/Auth';
import FormVolunteerSubmission, { VolunteerFormStatus } from '@infrastructure/postgres/FormVolunteerSubmission';
import { Body, Get, Path, Put, Query, Route, Tags, Response, Security, SuccessResponse, Post, Request } from 'tsoa';
import { Inject } from 'typescript-ioc';

@Tags('Volunteer Submissions')
@Route('submissions/volunteer')
export class VolunteerSubmissionsController {
    @Inject
    private submissionService!: VolunteerSubmissionsService;

    /**
     * Update status of volunteer form
     * @param changeStatusParams It takes values ('in progress', 'rejected', 'accepted')
     */
    @Security('jwt', ['admin', 'employee'])
    @Response<Error>(500, 'Internal Server Error')
    @Response<ApiError>(400, 'Bad Request')
    @Response<ApiError>(404, 'Not Found')
    @Response<ValidateErrorJSON>(422, 'Validation Failed')
    @SuccessResponse(200, 'ok')
    @Put('change')
    public async changeFormStatusForVolunteer(
        @Body() changeStatusParams: ChangeStatusForVolunterFormParams,
        @Request() request: IAuthUserInfoRequest,
    ): Promise<void> {
        await this.submissionService.changeStatusForVolunteerForm(changeStatusParams, request.user as IUserInfo);
    }

    /**
     * Get all volunteer submission and basic information about each of them
     * @param submissionDate Date that submission started
     * @param status Shows status of submission
     * @param userName Shows name of user that applied
     * @param reviewerName Shows name of shelter worker that deals with the matter
     */
    @Security('jwt', ['normal', 'volunteer', 'admin', 'employee'])
    @Response<Error>(500, 'Internal Server Error')
    @Response<ApiError>(404, 'Not Found')
    @SuccessResponse(200, 'ok')
    @Get()
    public async getAllSubmissions(
        @Query() submissionDate?: Date,
        @Query() status?: VolunteerFormStatus,
        @Query() userName?: string,
        @Query() reviewerName?: string,
        @Query() page?: number,
        @Query() perPage?: number,
    ): Promise<FormVolunteerSubmission[]> {
        return this.submissionService.getAllSubmissions(
            { submissionDate, status, userName, reviewerName },
            { page, perPage },
        );
    }

    /**
     * Get submission with unique ID
     * @param id The submission's identifier
     * @param isInt id
     */
    @Security('jwt', ['normal', 'volunteer', 'admin', 'employee'])
    @Response<ApiError>(404, 'Submission Not Found')
    @Response<ApiError>(401, 'Unauthorized')
    @Response<Error>(500, 'Internal Server Error')
    @SuccessResponse(200, 'ok')
    @Get('{id}')
    public async getVolunteerSubmission(
        @Path() id: number,
        @Request() request: IAuthUserInfoRequest,
    ): Promise<FormVolunteerSubmission> {
        return await this.submissionService.getVolunteerSubmission(id, request.user as IUserInfo);
    }

    @Security('jwt', ['normal', 'admin'])
    @SuccessResponse(204, 'Created')
    @Response<ApiError>(400, 'Bad Request')
    @Post('add')
    public async postVolunteerSubmission(
        @Body() requestBody: PostVolunteerSubmissionParams,
        @Request() request: IAuthUserInfoRequest,
    ): Promise<void> {
        return await this.submissionService.createVolunteerSubmission(requestBody, request);
    }
}
