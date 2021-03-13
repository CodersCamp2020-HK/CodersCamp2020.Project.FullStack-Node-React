import { AdoptersCount, AnimalSubmissionsService } from '@application/AnimalSubmissionsService';
import ApiError from '@infrastructure/ApiError';
import FormAnimalSubmission, { AnimalFormStatus } from '@infrastructure/postgres/FormAnimalSubmission';
import { Get, Query, Route, Tags, Response, SuccessResponse, Controller } from 'tsoa';
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
}