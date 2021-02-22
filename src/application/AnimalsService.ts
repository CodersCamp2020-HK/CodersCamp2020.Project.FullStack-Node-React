import { Animal } from 'entity/Animal';
import { getConnection } from 'typeorm';

export type AnimalCreationParams = Pick<Animal, 'name' | 'age'>;

export class AnimalsService {
    animalRepository = getConnection().getRepository(Animal);
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
}
