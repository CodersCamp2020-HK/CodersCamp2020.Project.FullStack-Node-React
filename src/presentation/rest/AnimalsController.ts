import { Body, Controller, Get, Path, Post, Put, Route, SuccessResponse, Tags, Query } from 'tsoa';
import { Inject } from 'typescript-ioc';
import { AnimalCreationParams, AnimalsService } from '@application/AnimalsService';
import { Animal, AnimalSpecies } from '@infrastructure/postgres/Animal';

@Tags('Animals')
@Route('animals')
export class AnimalsController extends Controller {
    @Inject
    private animalsService!: AnimalsService;

    @Get('{animalId}')
    public async getAnimal(@Path() animalId: number): Promise<Animal> {
        return this.animalsService.get(animalId);
    }

    @Get('/')
    public async getAnimals(
        @Query() minAge?: number,
        @Query() maxAge?: number,
        @Query() specie?: AnimalSpecies,
        @Query() readyForAdoption?: boolean,
        @Query() tempHouse?: boolean,
        @Query() needDonations?: boolean,
        @Query() virtualAdoption?: boolean,
        @Query() acceptsKids?: boolean,
        @Query() acceptsOtherAnimals?: boolean,
    ): Promise<Animal[]> {
        return this.animalsService.getAll(
            minAge,
            maxAge,
            specie,
            readyForAdoption,
            tempHouse,
            needDonations,
            virtualAdoption,
            acceptsKids,
            acceptsOtherAnimals,
        );
    }

    @SuccessResponse('201', 'created')
    @Post()
    public async createAnimal(@Body() requestBody: AnimalCreationParams): Promise<void> {
        this.setStatus(201);
        this.animalsService.create(requestBody);
        return;
    }
    /**
     * @param animalId This is a description for animalId
     * @isInt  animalId
     */
    @SuccessResponse('200')
    @Put('{animalId}')
    public async updateAnimal(@Path() animalId: number, @Body() requestBody: AnimalCreationParams): Promise<Animal> {
        this.setStatus(200);
        return this.animalsService.update({ id: animalId, ...requestBody });
    }
}
