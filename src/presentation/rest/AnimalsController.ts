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
    Request,
} from 'tsoa';
import { Inject } from 'typescript-ioc';
import { AnimalCreationParams, AnimalsService, AnimalUpdateParams } from '@application/AnimalsService';
import { Animal, AnimalSpecies } from '@infrastructure/postgres/Animal';
import { AnimalActiveLevel, AnimalSize } from '@infrastructure/postgres/AnimalAdditionalInfo';
import ApiError from '@infrastructure/ApiError';
import { Request as ExRequest } from 'express';
import { PhotosService } from '@application/PhotosService';

interface FileFields {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    buffer: Buffer;
    size: number;
}

@Tags('Animals')
@Route('animals')
export class AnimalsController extends Controller {
    @Inject
    private animalsService!: AnimalsService;

    @Inject
    private photosService!: PhotosService;

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

    @Security('jwt', ['admin', 'employee'])
    @Post('{animalId}/photos-upload')
    @SuccessResponse(201, 'Saved')
    @Response<ApiError>(401, 'Unauthorized')
    @Response<Error>(500, 'Internal Server Error')
    @Response<ApiError>(404, 'Not Found')
    @Response<ApiError>(400, 'Bad Request')
    public async addPhotos(@Path() animalId: number, @Request() request: ExRequest): Promise<void> {
        await this.photosService.photosUpload(request);
        const gettedPhotos = request.files as unknown;
        await this.animalsService.savePhotos(animalId, gettedPhotos as Express.Multer.File[]);
        this.setStatus(201);
    }

    @Security('jwt', ['admin', 'employee'])
    @Post('{animalId}/thumbnail-upload')
    @SuccessResponse(201, 'Saved')
    @Response<ApiError>(400, 'Bad Request')
    @Response<ApiError>(401, 'Unauthorized')
    @Response<Error>(500, 'Internal Server Error')
    @Response<ApiError>(404, 'Not Found')
    public async addThumbnail(@Path() animalId: number, @Request() request: ExRequest): Promise<void> {
        await this.photosService.thumbnailUpload(request);
        await this.animalsService.saveThumbnail(animalId, request.file);
        this.setStatus(201);
    }
}
