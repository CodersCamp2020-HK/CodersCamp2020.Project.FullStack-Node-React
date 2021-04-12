import AnimalAdditionalInfo from '../AnimalAdditionalInfo';
import { DeepPartial } from 'typeorm';
import * as faker from 'faker';
import { AnimalSize, AnimalActiveLevel } from '../AnimalAdditionalInfo';

export const seedAnimalAdditionalInfo = (amount: number): DeepPartial<AnimalAdditionalInfo>[] => {
    const animalAdditionalInfo: DeepPartial<AnimalAdditionalInfo>[] = [];
    for (let i = 0; i < amount; i++) {
        const randomSize = faker.random.arrayElement(Object.values(AnimalSize));
        const randomActiveLevel = faker.random.arrayElement(Object.values(AnimalActiveLevel));

        animalAdditionalInfo.push({
            activeLevel: randomActiveLevel,
            size: randomSize,
            specialDiet: faker.random.word(),
            comments: faker.random.word(),
            temporaryHome: faker.random.boolean(),
            needDonations: faker.random.boolean(),
            virtualAdoption: faker.random.boolean(),
            adoptionDate: '',
            admissionToShelter: faker.date.past(),
            acceptsKids: faker.random.boolean(),
            acceptsOtherAnimals: faker.random.boolean(),
        });
    }
    return animalAdditionalInfo;
};
