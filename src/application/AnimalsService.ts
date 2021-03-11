import { areAllPropertiesUndefined } from 'utils/AreAllPropertiesUndefined';
import Animal from '@infrastructure/postgres/Animal';
import { AnimalAdditionalInfo, AnimalSize, AnimalActiveLevel } from '@infrastructure/postgres/AnimalAdditionalInfo';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import ApiError from '@infrastructure/ApiError';

type AnimalParams = Pick<Animal, 'name' | 'age' | 'specie' | 'description' | 'readyForAdoption'>;
type AnimalAdditionalInfoParams = Omit<AnimalAdditionalInfo, 'id'>;
export type AnimalCreationParams = AnimalParams & { additionalInfo: AnimalAdditionalInfoParams };
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

type Primitive<T> = T extends Record<string, unknown> ? never : T;

class OptionalWhereSelectQueryBuilder<T> {
    constructor(
        public selectQueryBuilder: SelectQueryBuilder<T>,
        private count: number = 0,
        private uuid: string = uuidv4(),
    ) {}

    optAndWhere<P>(condition: string, param: Primitive<P>): OptionalWhereSelectQueryBuilder<T> {
        if (param !== undefined && param !== null) {
            const key = `${this.uuid}_${this.count++}`;
            const query = `${condition} :${key}`;
            this.selectQueryBuilder = this.selectQueryBuilder.andWhere(query, { [key]: param });
        }
        return this;
    }
}

export class AnimalsService {
    constructor(
        private animalRepository: Repository<Animal>,
        private animalAdditionalInfo: Repository<AnimalAdditionalInfo>,
    ) {}

    public async get(id: number): Promise<Animal> {
        const animal = await this.animalRepository.findOne(id);
        if (!animal) throw new ApiError('Not Found', 404, 'Animal not found in database');

        return animal;
    }

    public async create({ additionalInfo, ...animalParams }: AnimalCreationParams): Promise<void> {
        const animal = this.animalRepository.create(animalParams);
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
                .leftJoinAndSelect('animal.additional_info', 'info')
                .where('animal.id >= :zero', { zero: 0 }),
        )
            .optAndWhere('animal.ready_for_adoption = ', queryParams.readyForAdoption)
            .optAndWhere('info.temporary_home = ', queryParams.temporaryHome)
            .optAndWhere('info.need_donations = ', queryParams.needDonations)
            .optAndWhere('info.accepts_kids = ', queryParams.acceptsKids)
            .optAndWhere('info.accepts_other_animals = ', queryParams.acceptsOtherAnimals)
            .optAndWhere('info.virtual_adoption = ', queryParams.virtualAdoption)
            .optAndWhere('info.size = ', queryParams.size)
            .optAndWhere('info.active_level = ', queryParams.activeLevel)
            .optAndWhere('animal.age >= ', queryParams.minAge)
            .optAndWhere('animal.age <= ', queryParams.maxAge)
            .optAndWhere('animal.specie = ', queryParams.specie)
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
}
