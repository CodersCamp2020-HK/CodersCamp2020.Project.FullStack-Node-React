import { Animal } from '@infrastructure/postgres/Animal';
import { AnimalAdditionalInfo } from '@infrastructure/postgres/AnimalAdditionalInfo';
import { DeleteResult, Repository } from 'typeorm';

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

    public async delete(id: number): Promise<DeleteResult> {
        const animal = await this.animalRepository.findOne(id);
        if (!animal) throw new Error(`Animal with id: ${id} does not exist`);
        return await this.animalRepository.delete(id);
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
