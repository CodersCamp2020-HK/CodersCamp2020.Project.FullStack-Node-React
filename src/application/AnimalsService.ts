import ApiError from '@infrastructure/ApiError';
import PaginationParams from '@infrastructure/Pagination';
import Animal from '@infrastructure/postgres/Animal';
import AnimalAdditionalInfo, { AnimalActiveLevel, AnimalSize } from '@infrastructure/postgres/AnimalAdditionalInfo';
import { AnimalPhoto, AnimalThumbnailPhoto } from '@infrastructure/postgres/AnimalPhoto';
import Specie from '@infrastructure/postgres/Specie';
import { validate } from 'class-validator';
import { Repository } from 'typeorm';
import { areAllPropertiesUndefined } from 'utils/AreAllPropertiesUndefined';
import OptionalWhereSelectQueryBuilder from 'utils/OptionalWhereSelectQueryBuilder';

export interface AnimalCreationParams {
    name: string;
    age: number;
    specie: string;
    description: string;
    readyForAdoption: boolean;
    additionalInfo: {
        activeLevel: AnimalActiveLevel;
        size: AnimalSize;
        specialDiet: string;
        temporaryHome: boolean;
        needDonations: boolean;
        virtualAdoption: boolean;
        acceptsKids: boolean;
        acceptsOtherAnimals: boolean;
    };
}

export interface AnimalUpdateParams {
    name?: string;
    age?: number;
    specie?: string;
    description?: string;
    readyForAdoption?: boolean;
    additionalInfo?: {
        activeLevel?: AnimalActiveLevel;
        size?: AnimalSize;
        specialDiet?: string;
        temporaryHome?: boolean;
        needDonations?: boolean;
        virtualAdoption?: boolean;
        acceptsKids?: boolean;
        acceptsOtherAnimals?: boolean;
    };
}

interface AnimalQueryParams {
    minAge?: number;
    maxAge?: number;
    specie?: string;
    readyForAdoption?: boolean;
    temporaryHome?: boolean;
    needDonations?: boolean;
    virtualAdoption?: boolean;
    acceptsKids?: boolean;
    acceptsOtherAnimals?: boolean;
    size?: AnimalSize;
    activeLevel?: AnimalActiveLevel;
    count?: boolean;
}

export class AnimalsService {
    constructor(
        private animalRepository: Repository<Animal>,
        private animalAdditionalInfo: Repository<AnimalAdditionalInfo>,
        private animalPhotos: Repository<AnimalPhoto>,
        private speciesRepository: Repository<Specie>,
    ) {}

    public async get(id: number): Promise<Animal> {
        const animal = await this.animalRepository.findOne(id, { relations: ['additionalInfo'] });
        if (!animal) throw new ApiError('Not Found', 404, 'Animal not found in database');

        return animal;
    }

    public async create({ additionalInfo, specie, ...animalParams }: AnimalCreationParams): Promise<void> {
        const specieRow = await this.speciesRepository.findOne({ where: { specie } });

        if (!specieRow) {
            throw new ApiError('Not Found', 404, `specie with name: ${specie} not found!`);
        }

        const animal = this.animalRepository.create({
            ...animalParams,
            specie: { id: specieRow.id },
        });

        const animalAdditionalInfo = this.animalAdditionalInfo.create(additionalInfo);
        animal.additionalInfo = animalAdditionalInfo;

        const errors = await validate(animal);
        if (errors.length > 0) {
            throw new Error(`Validation failed!`);
        } else {
            await this.animalRepository.save(animal);
        }
    }

    public async delete(id: number): Promise<Animal> {
        const animal = await this.animalRepository.findOne(id);
        if (!animal) throw new ApiError('Not Found', 404, `Animal with id: ${id} not found!`);
        await this.animalRepository.delete(id);
        return animal;
    }

    public async getAll(
        queryParams: AnimalQueryParams,
        paginationParams?: PaginationParams,
    ): Promise<Animal[] | { count: number }> {
        let isFirstPage;
        let SKIP;
        let LIMIT;
        if (paginationParams) {
            isFirstPage = paginationParams.page === 1 ? true : false;
            SKIP =
                paginationParams.perPage && paginationParams.page
                    ? paginationParams.perPage * (paginationParams.page - 1)
                    : 0;
            LIMIT = paginationParams.perPage ? paginationParams.perPage : undefined;
        }

        const animalQuery = new OptionalWhereSelectQueryBuilder(
            this.animalRepository
                .createQueryBuilder('animal')
                .leftJoinAndSelect('animal.additionalInfo', 'info')
                .leftJoinAndSelect('animal.specie', 'specie')
                .leftJoinAndSelect('animal.thumbnail', 'thumbnail')
                .addOrderBy('info.admissionToShelter', 'DESC')
                .where('animal.id >= :zero', { zero: 0 })
                .skip(isFirstPage ? 0 : SKIP)
                .take(LIMIT),
        )
            .optAndWhere('animal.readyForAdoption = ', queryParams.readyForAdoption)
            .optAndWhere('info.temporaryHome = ', queryParams.temporaryHome)
            .optAndWhere('info.needDonations = ', queryParams.needDonations)
            .optAndWhere('info.acceptsKids = ', queryParams.acceptsKids)
            .optAndWhere('info.acceptsOtherAnimals = ', queryParams.acceptsOtherAnimals)
            .optAndWhere('info.virtualAdoption = ', queryParams.virtualAdoption)
            .optAndWhere('info.size = ', queryParams.size)
            .optAndWhere('info.activeLevel = ', queryParams.activeLevel)
            .optAndWhere('animal.age >= ', queryParams.minAge)
            .optAndWhere('animal.age <= ', queryParams.maxAge)
            .optAndWhere('specie.specie = ', queryParams.specie);

        if (queryParams.count) {
            return {
                count: await animalQuery.selectQueryBuilder.getCount(),
            };
        }

        return animalQuery.selectQueryBuilder.getMany();
    }

    public async update(id: number, { additionalInfo, specie, ...animalParams }: AnimalUpdateParams): Promise<Animal> {
        const animal = await this.animalRepository.findOne(id, { relations: ['additionalInfo', 'specie'] });
        if (!animal) throw new ApiError('Not Found', 404, `Animal with id: ${id} not found!`);

        const specieRow = await this.speciesRepository.findOne({ where: { specie } });

        if (areAllPropertiesUndefined({ additionalInfo, specie, ...animalParams }))
            throw new ApiError('Bad Request', 400, 'No data provided!');
        const updatedAnimal = {
            ...animal,
            ...animalParams,
            specie: specieRow ? specieRow : animal.specie,
            additionalInfo: { ...animal.additionalInfo, ...additionalInfo },
        };

        return await this.animalRepository.save(updatedAnimal);
    }

    public async savePhotos(id: number, files: Express.Multer.File[]): Promise<void> {
        const animal = await this.animalRepository.findOne(id);
        if (files.length <= 0) {
            throw new ApiError('Bad Request', 400, 'No photos provided!');
        }
        if (animal) {
            files.forEach(async (file) => {
                const photo = this.animalPhotos.create({
                    animal: animal,
                    buffer: file.buffer,
                });
                await this.animalPhotos.save(photo);
            });
        } else {
            throw new ApiError('Not Found', 404, `Animal with id: ${id} not found!`);
        }
    }

    public async saveThumbnail(id: number, file: Express.Multer.File): Promise<void> {
        const photoBuffer = file.buffer;
        if (!photoBuffer) {
            throw new ApiError('Bad Request', 400, 'No photo provided!');
        }

        const animal = await this.animalRepository.findOne(id);

        if (animal) {
            if (animal.thumbnail) {
                throw new ApiError('Bad Request', 400, 'Animal already has a thumbnail');
            }

            const photo = new AnimalThumbnailPhoto();
            photo.buffer = photoBuffer;

            animal.thumbnail = photo;
            this.animalRepository.save(animal);
        } else {
            throw new ApiError('Not Found', 404, `Animal with id: ${id} not found!`);
        }
    }

    public async getPhotos(animalId: number): Promise<AnimalPhoto[]> {
        const animalPhotos = await this.animalPhotos.find({
            where: {
                animal: {
                    id: animalId,
                },
            },
        });

        if (animalPhotos.length <= 0) {
            throw new ApiError('Not Found', 404, `Photos for animal with id: ${animalId} not found!`);
        }

        return animalPhotos;
    }
}
