import { Animal } from '@infrastructure/postgres/Animal';
import { Repository } from 'typeorm';

// /**
//  * @param animalId This is a description for animalId
//  * @param requestBody This is a description for requestBody
//  * @isDouble numberPathParam
//  * @minimum numberPathParam 1
//  * @maximum numberPathParam 10
//  *
//  * @minLength stringPathParam 1
//  * @maxLength stringPathParam 10
//  *
//  * @isString stringParam Custom error message
//  * @minLength stringParam 3
//  * @maxLength stringParam 10
//  */
export type AnimalCreationParams = Pick<Animal, 'name' | 'age'>;

export class AnimalsService {
    constructor(private animalRepository: Repository<Animal>) {}

    public async get(id: number): Promise<Animal> {
        const animal = await this.animalRepository.findOne(id);
        if (!animal) throw new Error('Animal not found in database');
        return animal;
    }

    public async getAll(): Promise<Animal[]> {
    //     createQueryBuilder("user")
    // .leftJoinAndSelect("user.photos", "photo")
    // .where("user.name = :name", { name: "Timber" })
    // .getOne();
        const animal = await this.animalRepository.createQueryBuilder('animal');
        await animal.where('animal.age >= :age', { age: 3 });
        await animal.andWhere('animal.age <= :age2', { age2: 5 });
        return animal.getMany();
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
