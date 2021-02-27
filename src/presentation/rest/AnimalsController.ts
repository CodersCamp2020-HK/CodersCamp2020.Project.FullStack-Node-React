import { Body, Controller, Get, Path, Post, Put, Route, SuccessResponse, Response, Tags } from 'tsoa';
import { Inject } from 'typescript-ioc';
import { AnimalCreationParams, AnimalsService } from '@application/AnimalsService';
import { Animal } from '@infrastructure/postgres/Animal';
import ApiError from '@infrastructure/ApiError';

@Tags('Animals')
@Route('animals')
export class AnimalsController extends Controller {
    @Inject
    private animalsService!: AnimalsService;

    @Response<ApiError>(404, 'Animal not found')
    @Get('{animalId}')
    public async getAnimal(@Path() animalId: number): Promise<Animal> {
        return this.animalsService.get(animalId);
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
