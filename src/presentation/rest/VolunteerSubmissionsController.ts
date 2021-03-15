import { ValidateErrorJSON } from '@application/UsersErrors';
import {
    ChangeStatusForVolunterFormParams,
    VolunteerSubmissionsService,
} from '@application/VolunteerSubmissionsService';
import ApiError from '@infrastructure/ApiError';
import FormVolunteerSubmission, { VolunteerFormStatus } from '@infrastructure/postgres/FormVolunteerSubmission';
import { Body, Get, Path, Put, Query, Route, Tags, Response, Security, SuccessResponse } from 'tsoa';
import { Inject } from 'typescript-ioc';

@Tags('Volunteer Submissions')
@Route('volunteerSubmissions')
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
    @Response<ValidateErrorJSON>(422, 'Validation Failed')
    @SuccessResponse('200', 'ok')
    @Put('changeVolunterFormStatus')
    public async changeFormStatusForVolunteer(
        @Body() changeStatusParams: ChangeStatusForVolunterFormParams,
    ): Promise<void> {
        await this.submissionService.changeStatusForVolunteerForm(changeStatusParams);
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
    @SuccessResponse('200', 'ok')
    @Get()
    public async getAllSubmissions(
        @Query() submissionDate?: Date,
        @Query() status?: VolunteerFormStatus,
        @Query() userName?: string,
        @Query() reviewerName?: string,
    ): Promise<FormVolunteerSubmission[]> {
        return this.submissionService.getAllSubmissions({ submissionDate, status, userName, reviewerName });
    }

    /**
     * Get submission with unique ID
     * @param id The submission's identifier
     * @param isInt id
     */
    //TODO:user sobie
    @Security('jwt', ['normal', 'volunteer', 'admin', 'employee'])
    @Response<ApiError>(404, 'Submission Not Found')
    @Response<ApiError>(401, 'Unauthorized')
    @Response<Error>(500, 'Internal Server Error')
    @SuccessResponse('200', 'ok')
    @Get('{id}')
    public async getVolunteerSubmission(@Path() id: number): Promise<FormVolunteerSubmission> {
        return this.submissionService.getVolunteerSubmission(id);
    }
}
