import {
    ChangeStatusForVolunterFormParams,
    PostVolunteerSubmissionParams,
    VolunteerSubmissionsService,
} from '@application/VolunteerSubmissionsService';
import ApiError from '@infrastructure/ApiError';
import { IAuthUserInfoRequest } from '@infrastructure/Auth';
import FormVolunteerSubmission, { VolunteerFormStatus } from '@infrastructure/postgres/FormVolunteerSubmission';
import { Body, Get, Path, Put, Query, Route, Tags, Response, Security, SuccessResponse, Post, Request } from 'tsoa';
import { Inject } from 'typescript-ioc';

@Tags('Volunteer Submissions')
@Route('volunteerSubmissions')
export class VolunteerSubmissionsController {
    @Inject
    private submissionService!: VolunteerSubmissionsService;

    @Put('changeVolunterFormStatus')
    public async changeFormStatusForVolunteer(
        @Body() changeStatusParams: ChangeStatusForVolunterFormParams,
    ): Promise<void> {
        await this.submissionService.changeStatusForVolunteerForm(changeStatusParams);
    }

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
     *
     * @param id The submission's identifier
     * @param isInt id
     */
    @Response<ApiError>(404, 'Submission Not Found')
    @Get('{id}')
    public async getVolunteerSubmission(@Path() id: number): Promise<FormVolunteerSubmission> {
        return this.submissionService.getVolunteerSubmission(id);
    }

    @Security('jwt', ['normal'])
    @SuccessResponse(201, 'Created')
    @Post('add')
    public async postVolunteerSubmission(
        @Body() requestBody: PostVolunteerSubmissionParams,
        @Request() request: IAuthUserInfoRequest,
    ): Promise<void> {
        this.submissionService.createVolunteerSubmission(requestBody, request);
    }
}
