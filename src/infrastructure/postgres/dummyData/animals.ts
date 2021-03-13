import Animal from '../Animal';
import { DeepPartial } from 'typeorm';
import * as faker from 'faker';
//import { AnimalSize, AnimalActiveLevel } from '../AnimalAdditionalInfo';

export const seedAnimals = (amount: number): DeepPartial<Animal>[] => {
    const animals: DeepPartial<Animal>[] = [];
    for (let i = 0; i < amount; i++) {
        // const randomSize = faker.random.arrayElement(Object.values(AnimalSize));
        //const randomActiveLevel = faker.random.arrayElement(Object.values(AnimalActiveLevel));
        //const randomSpecie = faker.random.arrayElement(['cat', 'dog']);

        animals.push({
            name: faker.name.firstName(),
            age: faker.random.number({
                min: 0,
                max: 15,
                precision: 1,
            }),
            description: faker.lorem.words(20),
            readyForAdoption: faker.random.boolean(),
            // specie: { id: 1 },
        });
    }
    return animals;
};
