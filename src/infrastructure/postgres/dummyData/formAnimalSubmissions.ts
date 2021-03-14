import { DeepPartial } from 'typeorm';
import * as faker from 'faker';
import FormAnimalSubmission from '../FormAnimalSubmission';
import { AnimalFormStatus } from '../FormAnimalSubmission';

export const seedFormAnimalSubmission = (amount: number): DeepPartial<FormAnimalSubmission>[] => {
    const formAnimalSubmission: DeepPartial<FormAnimalSubmission>[] = [];
    const randomStatus = faker.random.arrayElement(Object.values(AnimalFormStatus));
    for (let i = 0; i < amount; i++) {
        formAnimalSubmission.push({
            status: randomStatus,
            reason: faker.lorem.sentence(),
            submissionDate: faker.date.past(),
            reviewDate: faker.date.past(),
            animal: { id: i + 1 },
            applicant: { id: i + 1 },
            reviewer: ,
            adoptionStep: {
                organization: { id: 1 },
                specie: { id: 1 },
                number: i + 1,
            },
        });
    }
    return formAnimalSubmission;
};
