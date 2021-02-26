import { Animal, AnimalSpecies } from '@infrastructure/postgres/Animal';
import { AnimalAdditionalInfo } from '@infrastructure/postgres/AnimalAdditionalInfo';
import { Repository } from 'typeorm';

export type AnimalCreationParams = Pick<
    Animal,
    'name' | 'age' | 'specie' | 'description' | 'ready_for_adoption' | 'additional_info'
>;

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
        const animal = await this.animalRepository
            .createQueryBuilder('animal')
            .leftJoinAndSelect('animal.additional_info', 'info')
            .where('animal.id >= :zero', { zero: 0 });

        if (readyForAdoption !== undefined) {
            await animal.andWhere('animal.ready_for_adoption = :readyForAdoption', {
                readyForAdoption,
            });
        }

        if (temporaryHome !== undefined) {
            await animal.andWhere('info.temporary_home = :temporaryHome', { temporaryHome });
        }

        if (needDonations !== undefined) {
            await animal.andWhere('info.need_donations = :needDonations', { needDonations });
        }

        if (acceptsKids !== undefined) {
            await animal.andWhere('info.accepts_kids = :acceptsKids', { acceptsKids });
        }

        if (acceptsOtherAnimals !== undefined) {
            await animal.andWhere('info.accepts_other_animals = :acceptsOtherAnimals', {
                acceptsOtherAnimals,
            });
        }

        if (virtualAdoption !== undefined) {
            await animal.andWhere('info.virtual_adoption = :virtualAdoption', { virtualAdoption });
        }

        if (minAge) {
            await animal.andWhere('animal.age >= :minAge', { minAge });
        }

        if (maxAge) {
            await animal.andWhere('animal.age <= :maxAge', { maxAge });
        }

        if (specie) {
            await animal.andWhere('animal.specie = :specie', { specie });
        }

        return animal.getMany();
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
