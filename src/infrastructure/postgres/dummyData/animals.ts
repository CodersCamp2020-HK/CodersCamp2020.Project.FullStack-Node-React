import Animal from '../Animal';
import { DeepPartial } from 'typeorm';
import * as faker from 'faker';
//import { AnimalSize, AnimalActiveLevel } from '../AnimalAdditionalInfo';
// import Specie from '../Specie';

// enum Specie {
//     DOG = 'dog',
//     CAT = 'cat',
// }

export const seedAnimals = (amount: number): DeepPartial<Animal>[] => {
    const animals: DeepPartial<Animal>[] = [];
    for (let i = 0; i < amount; i++) {
        // const randomSpecie = faker.random.arrayElement(Object.values(Specie));
        //const randomActiveLevel = faker.random.arrayElement(Object.values(AnimalActiveLevel));
        // const randomSpecie = faker.random.arrayElement(['cat', 'dog']);

        animals.push({
            ...animals,
            name: faker.name.firstName(),
            age: faker.random.number({
                min: 0,
                max: 15,
                precision: 1,
            }),
            description: faker.lorem.words(20),
            readyForAdoption: faker.random.boolean(),
            additionalInfo: { id: i + 1 },
            thumbnail: { id: i + 1 },
            specie: { id: (i % 2) + 1 },
        });
    }
    return animals;
};
