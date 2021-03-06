import {
    AdoptersCount,
    AnimalSubmissionsService,
    ChangeStatusForAdoptionFormParams,
    PostAnimalSubmissionParams,
} from '@application/AnimalSubmissionsService';
import { ValidateErrorJSON } from '@application/UsersErrors';
import ApiError from '@infrastructure/ApiError';
import FormAnimalSubmission, { AnimalFormStatus } from '@infrastructure/postgres/FormAnimalSubmission';
import {
    Body,
    Put,
    Get,
    Query,
    Route,
    Tags,
    Response,
    SuccessResponse,
    Controller,
    Path,
    Security,
    Post,
    Request,
    Delete,
} from 'tsoa';
import { Inject } from 'typescript-ioc';
import { IAuthUserInfoRequest, IUserInfo } from '@infrastructure/Auth';

@Tags('Adoption Submissions')
@Route('submissions/animals')
export class AnimalSubmissionsController extends Controller {
    @Inject
    private submissionService!: AnimalSubmissionsService;

    /**
     * Get all animal submissions with parameters
     * @param status Gives information about status of animal that user applied. It can give you information that application is: 'in progress', 'rejected', or 'accepted'
     * @param submissionDate Gives date when user applied for an animal
     * @param specie Gives additional informations that was added by a user
     * @param animalName Gives animal name that user applied
     * @param userName Gives name of user that applied for animal
     * @param reviewerName Gives name of shelter worker that who deals with the user application
     */
    @Security('jwt', ['admin', 'employee'])
    @Response<ApiError>(404, 'Submissions Not Found')
    @Response<ApiError>(401, 'Unauthorized')
    @Response<Error>(500, 'Internal Server Error')
    @SuccessResponse(200, 'ok')
    @Get()
    public async getAllAnimalSubmissions(
        @Request() request: IAuthUserInfoRequest,
        @Query() status?: AnimalFormStatus,
        @Query() submissionDate?: Date,
        @Query() specie?: string,
        @Query() animalName?: string,
        @Query() userName?: string,
        @Query() reviewerName?: string,
        @Query() page?: number,
        @Query() perPage?: number,
    ): Promise<FormAnimalSubmission[]> {
        return this.submissionService.getAllAnimalSubmissions(
            {
                status,
                submissionDate,
                animalName,
                specie,
                userName,
                reviewerName,
            },
            request.user as IUserInfo,
            { page, perPage },
        );
    }

    /**
     * Method allows shelter worker to change the status of user application for an animal
     * @param changeStatusParams Information about actual status of application ('in progress', 'rejected', 'accepted')
     */
    @Security('jwt', ['admin', 'employee'])
    @Response<Error>(500, 'Internal Server Error')
    @Response<ValidateErrorJSON>(422, 'Validation Failed')
    @Response<ApiError>(400, 'Bad Request')
    @Response<ApiError>(404, 'Not Found')
    @SuccessResponse(200, 'ok')
    @Put('change')
    public async changeFormStatusForAdoption(
        @Body() changeStatusParams: ChangeStatusForAdoptionFormParams,
        @Request() request: IAuthUserInfoRequest,
    ): Promise<void> {
        await this.submissionService.changeStatusForAdoptionForm(changeStatusParams, request.user as IUserInfo);
    }

    /**
     * Get number of adopters wanting to adopt given animal
     * @param petName pet name which adopters want to adopt
     */
    @Response<Error>(500, 'Internal Server Error')
    @Response<ApiError>(404, 'Not Found')
    @SuccessResponse(200, 'Ok')
    @Get('count')
    public async getAllWillignessesToAdoptCount(@Query() petName: string): Promise<AdoptersCount> {
        this.setStatus(200);
        return this.submissionService.adoptWillingnessCounter(petName);
    }

    /**
     * Method get information about submission, supplied by unique ID
     * @param id The submission's identifier
     */
    @Security('jwt', ['normal', 'volunteer', 'admin', 'employee'])
    @Response<ApiError>(401, 'Unauthorized')
    @Response<ApiError>(404, 'Submission Not Found')
    @Response<Error>(500, 'Internal Server Error')
    @SuccessResponse(200, 'ok')
    @Get('/user/{userId}')
    public async getAnimalSubmission(
        @Path() userId: number,
        @Request() request: IAuthUserInfoRequest,
    ): Promise<FormAnimalSubmission> {
        return await this.submissionService.getAnimalSubmission(userId, request.user as IUserInfo);
    }

    @Security('jwt', ['admin', 'normal'])
    @Response<ApiError>(400, 'Bad Request')
    @SuccessResponse(204, 'Created')
    @Post('add')
    public async postAnimalSubmission(
        @Body() requestBody: PostAnimalSubmissionParams,
        @Request() request: IAuthUserInfoRequest,
    ): Promise<void> {
        await this.submissionService.createAnimalSubmission(requestBody, request);
        this.setStatus(204);
    }

    @Security('jwt', ['admin', 'normal', 'volunteer', 'employee'])
    @Response<ApiError>(404, 'Not Found')
    @SuccessResponse(204, 'Deleted')
    @Delete('{userId}')
    public async deleteAnimalSubmission(
        @Path() userId: number,
        @Request() request: IAuthUserInfoRequest,
    ): Promise<void> {
        await this.deleteAnimalSubmission(userId, request);
        this.setStatus(204);
    }

    @Security('jwt', ['admin', 'employee'])
    @Response<ApiError>(404, 'Submission Not Found')
    @Response<Error>(500, 'Internal Server Error')
    @SuccessResponse(200, 'ok')
    @Get('{animalId}')
    public async getAnimalSubmissionByAnimalId(@Path() animalId: number): Promise<FormAnimalSubmission[]> {
        return await this.submissionService.getAnimalSubmissionByAnimalId(animalId);
    }
}
