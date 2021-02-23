import { Animal } from 'entity/Animal';
import { Repository } from 'typeorm';

export type AnimalCreationParams = Pick<Animal, 'name' | 'age'>;

export class AnimalsService {
    constructor(private animalRepository: Repository<Animal>) {}

    public async get(id: number): Promise<Animal> {
        const animal = await this.animalRepository.findOne(id);
        if (!animal) throw new Error('Animal not found in database');
        return animal;
    }

    public async create(animalCreationParams: AnimalCreationParams): Promise<void> {
        const animal = new Animal();
        animal.name = animalCreationParams.name;
        animal.age = animalCreationParams.age;
        await this.animalRepository.save(animal);
    }

    public async update(animal: Animal): Promise<Animal> {
        throw new Error(`Not implemented ${animal}`);
    }
}
