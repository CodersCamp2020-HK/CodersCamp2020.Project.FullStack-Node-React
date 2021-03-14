import {
    AdoptersCount,
    AnimalSubmissionsService,
    ChangeStatusForAdoptionFormParams,
    PostAnimalSubmissionParams,
} from '@application/AnimalSubmissionsService';
import ApiError from '@infrastructure/ApiError';
import { IAuthUserInfoRequest } from '@infrastructure/Auth';
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
} from 'tsoa';
import { Inject } from 'typescript-ioc';

@Tags('Adoption Submissions')
@Route('adoptionSubmissions')
export class AnimalSubmissionsController extends Controller {
    @Inject
    private submissionService!: AnimalSubmissionsService;

    @Response<ApiError>(404, 'Submissions Not Found')
    @Get()
    public async getAllAnimalSubmissions(
        @Query() status?: AnimalFormStatus,
        @Query() submissionDate?: Date,
        @Query() specie?: string,
        @Query() animalName?: string,
        @Query() userName?: string,
        @Query() reviewerName?: string,
    ): Promise<FormAnimalSubmission[]> {
        return this.submissionService.getAllAnimalSubmissions({
            status,
            submissionDate,
            animalName,
            specie,
            userName,
            reviewerName,
        });
    }

    @Put('changeAdoptionFormStatus')
    public async changeFormStatusForAdoption(
        @Body() changeStatusParams: ChangeStatusForAdoptionFormParams,
    ): Promise<void> {
        await this.submissionService.changeStatusForAdoptionForm(changeStatusParams);
    }

    /**
     * Get number of adopters wanting to adopt given animal
     * @param petName pet name which adopters want to adopt
     */
    @Response('500', 'Internal Server Error')
    @SuccessResponse('200', 'Ok')
    @Get('allWillignessesToAdoptCount')
    public async getAllWillignessesToAdoptCount(@Query() petName: string): Promise<AdoptersCount> {
        this.setStatus(200);
        return this.submissionService.adoptWillingnessCounter(petName);
    }

    /**
     *
     * @param id The submission's identifier
     * @param isInt id
     */
    @Response<ApiError>(404, 'Submission Not Found')
    @Get('{id}')
    public async getAnimalSubmission(@Path() id: number): Promise<FormAnimalSubmission> {
        return this.submissionService.getAnimalSubmission(id);
    }

    @Security('jwt', ['admin', 'employee', 'volunteer', 'normal'])
    @SuccessResponse(201, 'Created')
    @Post('add')
    public async postAnimalSubmission(
        @Body() requestBody: PostAnimalSubmissionParams,
        @Request() request: IAuthUserInfoRequest,
    ): Promise<void> {
        this.setStatus(201);
        this.submissionService.createAnimalSubmission(requestBody, request);
    }
}
