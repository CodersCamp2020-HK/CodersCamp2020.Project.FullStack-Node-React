import { Animal, AnimalSpecies } from '@infrastructure/postgres/Animal';
import { AnimalAdditionalInfo } from '@infrastructure/postgres/AnimalAdditionalInfo';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

export type AnimalCreationParams = Pick<
    Animal,
    'name' | 'age' | 'specie' | 'description' | 'ready_for_adoption' | 'additional_info'
>;

type Primitive<T> = T extends object ? never : T;

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
        if (!animal) throw new Error('Animal not found in database');
        return animal;
    }

    public async getAll(
        minAge?: number,
        maxAge?: number,
        specie?: AnimalSpecies,
        readyForAdoption?: boolean,
        temporaryHome?: boolean,
        needDonations?: boolean,
        virtualAdoption?: boolean,
        acceptsKids?: boolean,
        acceptsOtherAnimals?: boolean,
    ): Promise<Animal[]> {
        return new OptionalWhereSelectQueryBuilder(
            this.animalRepository
                .createQueryBuilder('animal')
                .leftJoinAndSelect('animal.additional_info', 'info')
                .where('animal.id >= :zero', { zero: 0 }),
        )
            .optAndWhere('animal.ready_for_adoption = ', readyForAdoption)
            .optAndWhere('info.temporary_home = ', temporaryHome)
            .optAndWhere('info.need_donations = ', needDonations)
            .optAndWhere('info.accepts_kids = ', acceptsKids)
            .optAndWhere('info.accepts_other_animals = ', acceptsOtherAnimals)
            .optAndWhere('info.virtual_adoption = ', virtualAdoption)
            .optAndWhere('animal.age >= ', minAge)
            .optAndWhere('animal.age <= ', maxAge)
            .optAndWhere('animal.specie = ', specie)
            .selectQueryBuilder.getMany();
    }

    public async create({
        name,
        age,
        specie,
        description,
        ready_for_adoption,
        additional_info,
    }: AnimalCreationParams): Promise<void> {
        const animal = this.animalRepository.create({
            name,
            age,
            specie,
            description,
            ready_for_adoption,
        });
        const {
            temporary_home,
            need_donations,
            virtual_adoption,
            adoption_date,
            admission_to_shelter,
            accepts_kids,
            accepts_other_animals,
        } = additional_info;
        const animalAdditionalInfo = this.animalAdditionalInfo.create({
            temporary_home,
            need_donations,
            virtual_adoption,
            adoption_date,
            admission_to_shelter,
            accepts_kids,
            accepts_other_animals,
        });
        animal.additional_info = animalAdditionalInfo;

        await this.animalRepository.save(animal);
    }

    public async update(animal: Animal): Promise<Animal> {
        throw new Error(`Not implemented ${animal}`);
    }
}
