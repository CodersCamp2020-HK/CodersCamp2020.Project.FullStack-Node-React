import {
    ChangeStatusForVolunterFormParams,
    VolunteerSubmissionsService,
} from '@application/VolunteerSubmissionsService';
import ApiError from '@infrastructure/ApiError';
import FormVolunteerSubmission, { VolunteerFormStatus } from '@infrastructure/postgres/FormVolunteerSubmission';
import { Body, Get, Path, Put, Query, Route, Tags, Response } from 'tsoa';
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
     * @returns
     */
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
    @Response<ApiError>(404, 'Submission Not Found')
    @Get('{id}')
    public async getVolunteerSubmission(@Path() id: number): Promise<FormVolunteerSubmission> {
        return this.submissionService.getVolunteerSubmission(id);
    }
}
