import { Body, Controller, Get, Path, Post, Put, Res, Route, SuccessResponse, Tags, TsoaResponse } from 'tsoa';
import { Inject } from 'typescript-ioc';
import { AnimalCreationParams, AnimalsService, AnimalUpdateParams } from '@application/AnimalsService';
import { Animal } from '@infrastructure/postgres/Animal';

@Tags('Animals')
@Route('animals')
export class AnimalsController extends Controller {
    @Inject
    private animalsService!: AnimalsService;

    @Get('{animalId}')
    public async getAnimal(@Path() animalId: number): Promise<Animal> {
        return this.animalsService.get(animalId);
    }

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
    @SuccessResponse('200')
    @Put('{animalId}')
    public async updateAnimal(
        @Path() animalId: number,
        @Body() requestBody: AnimalUpdateParams,
        @Res() errorResponse: TsoaResponse<400, { reason: string }>,
    ): Promise<Animal> {
        try {
            this.setStatus(200);
            return this.animalsService.update(animalId, requestBody);
        } catch (error) {
            return errorResponse(error.status, { reason: error.message });
        }
    }
}
