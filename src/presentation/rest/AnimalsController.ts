import {
    Body,
    Controller,
    Get,
    Path,
    Post,
    Put,
    Route,
    SuccessResponse,
    Response,
    Tags,
    Delete,
    Query,
    TsoaResponse,
    Res,
    Security,
} from 'tsoa';
import { Inject } from 'typescript-ioc';
import { AnimalCreationParams, AnimalsService, AnimalUpdateParams } from '@application/AnimalsService';
import { Animal, AnimalSpecies } from '@infrastructure/postgres/Animal';
import { AnimalActiveLevel, AnimalSize } from '@infrastructure/postgres/AnimalAdditionalInfo';
import ApiError from '@infrastructure/ApiError';

@Tags('Animals')
@Route('animals')
export class AnimalsController extends Controller {
    @Inject
    private animalsService!: AnimalsService;

    /**
     * Supply the unique animal ID and get the animal with corresponding id from database
     * @param animalId The animal's identifier
     */
    @Response<Error>(500, 'Internal Server Error')
    @Response<ApiError>(404, 'Animal not found')
    @Get('{animalId}')
    public async getAnimal(@Path() animalId: number): Promise<Animal> {
        return this.animalsService.get(animalId);
    }

    /**
     * Supply the unique animal ID and delete the animal with corresponding id from database
     *  @param animalId The animal's identifier
     *  @isInt  animalId
     */
    @Security('jwt', ['admin', 'employee'])
    @Response<ApiError>(400, 'Bad Request')
    @Response<ApiError>(401, 'Unauthorized')
    @Response<Error>(500, 'Internal Server Error')
    @Response<ApiError>(404, 'Not Found')
    @Delete('{animalId}')
    public async deleteAnimal(@Path() animalId: number): Promise<Animal> {
        return this.animalsService.delete(animalId);
    }

    /**
     * Get all animals and basic informations about each of them
     * @param notFoundResponse Throws error when didn't response anumal ID
     * @param minAge The animal's minimal age
     * @param maxAge The animal's maximal age
     * @param specie Gives information about specification of animal
     * @param readyForAdoption Gives information about adoption status. Animal is ready for adoption or no
     * @param temporaryHome The animal's information about adoption status
     * @param needDonations Gives information that animal need donations
     * @param virtualAdoption Gives information that animal could be adopted virtually
     * @param acceptsKids Gives information that animal accept kids
     * @param acceptsOtherAnimals Gives information that animal accept other animals
     * @param activeLevel Gives information about active level of animal
     * @param size Gives information about size of animal
     */
    @SuccessResponse('200')
    @Get('/')
    public async getAnimals(
        @Res() notFoundResponse: TsoaResponse<404, { reason: string }>,
        @Query() minAge?: number,
        @Query() maxAge?: number,
        @Query() specie?: AnimalSpecies,
        @Query() readyForAdoption?: boolean,
        @Query() temporaryHome?: boolean,
        @Query() needDonations?: boolean,
        @Query() virtualAdoption?: boolean,
        @Query() acceptsKids?: boolean,
        @Query() acceptsOtherAnimals?: boolean,
        @Query() activeLevel?: AnimalActiveLevel,
        @Query() size?: AnimalSize,
    ): Promise<Animal[]> {
        const foundedAnimals = await this.animalsService.getAll({
            minAge,
            maxAge,
            specie,
            readyForAdoption,
            temporaryHome,
            needDonations,
            virtualAdoption,
            acceptsKids,
            acceptsOtherAnimals,
            size,
            activeLevel,
        });

        /**
         * Throws error if it cannot find a match
         */
        if (foundedAnimals.length <= 0) {
            return notFoundResponse(404, { reason: 'Animals not found' });
        }

        return foundedAnimals;
    }

    /**
     * Create animal in database with informations about 'name' | 'age' | 'specie' | 'description' | 'readyForAdoption';
     * @param requestBody
     */
    @Response<Error>(500, 'Internal Server Error')
    @SuccessResponse('201', 'created')
    @Post()
    public async createAnimal(@Body() requestBody: AnimalCreationParams): Promise<void> {
        this.setStatus(201);
        this.animalsService.create(requestBody);
    }

    /**
     * Suppy animal ID and update information about animal
     * @param animalId This is a description for animalId
     * @isInt animalId
     */
    @Security('jwt', ['admin', 'employee'])
    @Response<ApiError>(400, 'Bad Request')
    @Response<ApiError>(401, 'Unauthorized')
    @Response<Error>(500, 'Internal Server Error')
    @Response<ApiError>(400, 'Bad Reqest')
    @Response<ApiError>(404, 'Not Found')
    @SuccessResponse('200')
    @Put('{animalId}')
    public async updateAnimal(@Path() animalId: number, @Body() requestBody: AnimalUpdateParams): Promise<Animal> {
        this.setStatus(200);
        return this.animalsService.update(animalId, requestBody);
    }
}
