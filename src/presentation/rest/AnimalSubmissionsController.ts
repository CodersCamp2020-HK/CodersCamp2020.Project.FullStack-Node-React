import {
    AdoptersCount,
    AnimalSubmissionsService,
    ChangeStatusForAdoptionFormParams,
} from '@application/AnimalSubmissionsService';
import ApiError from '@infrastructure/ApiError';
import FormAnimalSubmission, { AnimalFormStatus } from '@infrastructure/postgres/FormAnimalSubmission';
import { Body, Put, Get, Query, Route, Tags, Response, SuccessResponse, Controller, Path } from 'tsoa';
import { Inject } from 'typescript-ioc';

@Tags('Adoption Submissions')
@Route('adoptionSubmissions')
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
     * @isString reviewerName reviewerName must be a string
     */
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
     * Method allows shelter worker to change the status of user application for an animal
     * @param changeStatusParams Information about actual status of application ('in progress', 'rejected', 'accepted')
     */
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
     * Method get information about submission, supplied by unique ID
     * @param id The submission's identifier
     */
    @Response<ApiError>(404, 'Submission Not Found')
    @Get('{id}')
    public async getAnimalSubmission(@Path() id: number): Promise<FormAnimalSubmission> {
        return this.submissionService.getAnimalSubmission(id);
    }
}
