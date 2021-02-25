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

    public async getAll(minAge?: number, maxAge?: number, specie?: AnimalSpecies): Promise<Animal[]> {
        const animal = await this.animalRepository.createQueryBuilder('animal').where('animal.id >= :zero', {zero: 0});
        if (minAge) {
            animal.andWhere('animal.age >= :agemin', { agemin: minAge });
        }
        if (maxAge) {
            animal.andWhere('animal.age <= :agemax', { agemax: maxAge });
        }

        if (specie) {
            animal.andWhere('animal.specie = :specie', { specie: specie });
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
