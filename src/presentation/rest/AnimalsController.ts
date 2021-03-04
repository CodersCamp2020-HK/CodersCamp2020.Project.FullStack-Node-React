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
    @Response<Error>(500, 'Internal Server Error')
    @Response<ApiError>(404, 'Not Found')
    @Delete('{animalId}')
    public async deleteAnimal(@Path() animalId: number): Promise<Animal> {
        return this.animalsService.delete(animalId);
    }

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

        if (foundedAnimals.length <= 0) {
            return notFoundResponse(404, { reason: 'Animals not found' });
        }

        return foundedAnimals;
    }

    @Response<Error>(500, 'Internal Server Error')
    @SuccessResponse('201', 'created')
    @Post()
    public async createAnimal(@Body() requestBody: AnimalCreationParams): Promise<void> {
        this.setStatus(201);
        this.animalsService.create(requestBody);
    }

    /**
     * @param animalId This is a description for animalId
     * @isInt  animalId
     */
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
