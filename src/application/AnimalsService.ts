import { Animal } from '@infrastructure/postgres/Animal';
import { Repository } from 'typeorm';

export type AnimalCreationParams = Pick<
    Animal,
    'name' | 'age' | 'specie' | 'description' | 'ready_for_adoption' | 'additional_info'
>;

export class AnimalsService {
    constructor(private animalRepository: Repository<Animal>) {}

    public async get(id: number): Promise<Animal> {
        const animal = await this.animalRepository.findOne(id);
        if (!animal) throw new Error('Animal not found in database');
        return animal;
    }

    public async create(animalCreationParams: AnimalCreationParams): Promise<void> {
        const animal = this.animalRepository.create(animalCreationParams);
        await this.animalRepository.save(animal);
    }

    public async update(animal: Animal): Promise<Animal> {
        throw new Error(`Not implemented ${animal}`);
    }
}
