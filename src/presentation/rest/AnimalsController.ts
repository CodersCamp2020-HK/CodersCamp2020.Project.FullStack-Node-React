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
    Example,
    Request,
} from 'tsoa';
import { Inject } from 'typescript-ioc';
import { AnimalCreationParams, AnimalsService, AnimalUpdateParams } from '@application/AnimalsService';
import Animal from '@infrastructure/postgres/Animal';
import { AnimalActiveLevel, AnimalSize } from '@infrastructure/postgres/AnimalAdditionalInfo';
import ApiError from '@infrastructure/ApiError';
import { ValidateErrorJSON } from '@application/UsersErrors';
import { DeepPartial } from 'typeorm';
import { Request as ExRequest } from 'express';
import { PhotosService } from '@application/PhotosService';

@Tags('Animals')
@Route('animals')
export class AnimalsController extends Controller {
    @Inject
    private animalsService!: AnimalsService;

    @Inject
    private photosService!: PhotosService;

    /**
     * Supply the unique animal ID and get the animal with corresponding id from database
     * @param animalId The animal's identifier
     */
    @Response<Error>(500, 'Internal Server Error')
    @Response<ApiError>(404, 'Animal not found')
    @Example<DeepPartial<Animal>>({
        id: 1,
        name: 'Lavon',
        age: 0,
        description:
            'debitis aut placeat possimus nam rerum eligendi quisquam et deleniti eaque sunt assumenda doloremque voluptatem adipisci et numquam qui tempore',
        readyForAdoption: true,
        thumbnail: {
            id: 1,
            buffer: {
                type: 'Buffer',
                data: [104, 101, 108, 108, 111, 32, 119, 111, 114, 108, 100],
            } as DeepPartial<Buffer>,
        },
    })
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
    @Response<ValidateErrorJSON>(422, 'Validation Failed')
    @Response<ApiError>(400, 'Bad Request')
    @Response<ApiError>(401, 'Unauthorized')
    @Response<Error>(500, 'Internal Server Error')
    @Response<ApiError>(404, 'Not Found')
    @Example<DeepPartial<Animal>>({
        id: 1,
        name: 'Lavon',
        age: 0,
        description:
            'debitis aut placeat possimus nam rerum eligendi quisquam et deleniti eaque sunt assumenda doloremque voluptatem adipisci et numquam qui tempore',
        readyForAdoption: true,
        thumbnail: {
            id: 1,
            buffer: {
                type: 'Buffer',
                data: [104, 101, 108, 108, 111, 32, 119, 111, 114, 108, 100],
            } as DeepPartial<Buffer>,
        },
    })
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
    @SuccessResponse(200, 'ok')
    @Response<Error>(500, 'Internal Server Error')
    @Response<ApiError>(404, 'Not Found')
    @Example([
        {
            id: 2,
            name: 'Aiyana',
            age: 2,
            description:
                'enim ipsum mollitia eligendi accusantium qui labore omnis et quidem provident deserunt impedit praesentium commodi cumque quis rerum nihil odio',
            readyForAdoption: false,
            additionalInfo: {
                id: 2,
                activeLevel: 'high',
                size: 'large',
                specialDiet: 'Vegan',
                comments: 'I like toys',
                temporaryHome: true,
                needDonations: false,
                virtualAdoption: true,
                adoptionDate: '2020-05-27',
                admissionToShelter: '2020-04-20',
                acceptsKids: false,
                acceptsOtherAnimals: false,
            },
        },
    ])
    @Get('/')
    public async getAnimals(
        @Res() notFoundResponse: TsoaResponse<404, { reason: string }>,
        @Query() minAge?: number,
        @Query() maxAge?: number,
        @Query() specie?: string,
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
    @Security('jwt', ['admin', 'employee'])
    @Response<ValidateErrorJSON>(422, 'Validation Failed')
    @Response<Error>(500, 'Internal Server Error')
    @Response<ApiError>(400, 'Bad Request')
    @Response<ApiError>(404, 'Specie not found')
    @SuccessResponse(201, 'created')
    @Example<DeepPartial<AnimalCreationParams>>({
        name: 'Felek',
        age: 1,
        specie: 'cat',
        description: 'sadsadhh',
        readyForAdoption: false,
        additionalInfo: {
            activeLevel: AnimalActiveLevel.HIGH,
            size: AnimalSize.SMALL,
            specialDiet: 'none',
            temporaryHome: false,
            needDonations: false,
            virtualAdoption: false,
            acceptsKids: false,
            acceptsOtherAnimals: false,
        },
    })
    @Post()
    public async createAnimal(@Body() requestBody: AnimalCreationParams): Promise<void> {
        await this.animalsService.create(requestBody);
        this.setStatus(201);
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
    @Response<ApiError>(404, 'Not Found')
    @Response<ValidateErrorJSON>(422, 'Validation Failed')
    @SuccessResponse(200, 'ok')
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
