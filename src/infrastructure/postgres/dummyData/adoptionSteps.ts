import { DeepPartial } from 'typeorm';
import * as faker from 'faker';
import AdoptionStep from '../AdoptionStep';

export const seedAdoptionStep = (amount: number): DeepPartial<AdoptionStep>[] => {
    const adoptionStep: DeepPartial<AdoptionStep>[] = [];
    for (let i = 0; i < amount; i++) {
        // const randomSize = faker.random.arrayElement(Object.values(AnimalSize));
        // const randomActiveLevel = faker.random.arrayElement(Object.values(AnimalActiveLevel));

        adoptionStep.push({
            name: faker.random.word(),
            description: faker.lorem.words(5),
            organization: { id: 1 },
            number: i,
            form: { id: i + 1 },
            specie: { id: (i % 2) + 1 },
        });
    }
    return adoptionStep;
};
