import { DeepPartial } from 'typeorm';
import * as faker from 'faker';
import AnimalHandler from '../AnimalHandler';

export const seedAnimalHandlers = (amount: number): DeepPartial<AnimalHandler>[] => {
    const animalhandlers: DeepPartial<AnimalHandler>[] = [];
    for (let i = 0; i < amount; i++) {
        // const randomSize = faker.random.arrayElement(Object.values(AnimalSize));
        // const randomActiveLevel = faker.random.arrayElement(Object.values(AnimalActiveLevel));

        animalhandlers.push({
            role: faker.random.word(),
            animal: { id: i + 1 },
        });
    }
    return animalhandlers;
};
