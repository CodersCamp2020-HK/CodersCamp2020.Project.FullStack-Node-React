import { areAllPropertiesUndefined } from 'utils/AreAllPropertiesUndefined';
import { AnimalPhoto, AnimalThumbnailPhoto } from '@infrastructure/postgres/AnimalPhoto';
import Animal from '@infrastructure/postgres/Animal';
import AnimalAdditionalInfo, { AnimalSize, AnimalActiveLevel } from '@infrastructure/postgres/AnimalAdditionalInfo';
import { Repository } from 'typeorm';
import ApiError from '@infrastructure/ApiError';
import OptionalWhereSelectQueryBuilder from 'utils/OptionalWhereSelectQueryBuilder';
import Specie from '@infrastructure/postgres/Specie';

type AnimalParams = Pick<Animal, 'name' | 'age' | 'specie' | 'description' | 'readyForAdoption'>;
type AnimalAdditionalInfoParams = Omit<AnimalAdditionalInfo, 'id'>;
//export type AnimalCreationParams = AnimalParams & { additionalInfo: AnimalAdditionalInfoParams };
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

//export type AnimalCreationParams = AnimalParams & { additionalInfo: AnimalAdditionalInfoParams };
export type AnimalUpdateParams = Partial<AnimalParams & { additionalInfo: Partial<AnimalAdditionalInfoParams> }>;

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
}

export class AnimalsService {
    constructor(
        private animalRepository: Repository<Animal>,
        private animalAdditionalInfo: Repository<AnimalAdditionalInfo>,
        private animalPhotos: Repository<AnimalPhoto>,
        private speciesRepository: Repository<Specie>,
    ) {}

    public async get(id: number): Promise<Animal> {
        const animal = await this.animalRepository.findOne(id);
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
        await this.animalRepository.save(animal);
    }

    public async delete(id: number): Promise<Animal> {
        const animal = await this.animalRepository.findOne(id);
        if (!animal) throw new ApiError('Not Found', 404, `Animal with id: ${id} not found!`);
        await this.animalRepository.delete(id);
        return animal;
    }

    public async getAll(queryParams: AnimalQueryParams): Promise<Animal[]> {
        return new OptionalWhereSelectQueryBuilder(
            this.animalRepository
                .createQueryBuilder('animal')
                .leftJoinAndSelect('animal.additionalInfo', 'info')
                .leftJoinAndSelect('animal.specie', 'specie')
                .where('animal.id >= :zero', { zero: 0 }),
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
            .optAndWhere('specie.specie = ', queryParams.specie)
            .selectQueryBuilder.getMany();
    }

    public async update(id: number, { additionalInfo, ...animalParams }: AnimalUpdateParams): Promise<Animal> {
        const animal = await this.animalRepository.findOne(id, { relations: ['additional_info'] });
        if (!animal) throw new ApiError('Not Found', 404, `Animal with id: ${id} not found!`);
        if (areAllPropertiesUndefined({ additionalInfo, ...animalParams }))
            throw new ApiError('Bad Request', 400, 'No data provided!');
        const updatedAnimal = {
            ...animal,
            ...animalParams,
            additional_info: { ...animal.additionalInfo, ...additionalInfo },
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
}
