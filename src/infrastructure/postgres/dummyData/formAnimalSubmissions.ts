import { DeepPartial } from 'typeorm';
import * as faker from 'faker';
import FormAnimalSubmission from '../FormAnimalSubmission';
import { AnimalFormStatus } from '../FormAnimalSubmission';

export const seedFormAnimalSubmission = (): DeepPartial<FormAnimalSubmission>[] => {
    const randomStatus = faker.random.arrayElement(Object.values(AnimalFormStatus));
    const formAnimalSubmission: DeepPartial<FormAnimalSubmission>[] = [
        {
            id: 1,
            status: randomStatus,
            reason: faker.lorem.sentence(),
            submissionDate: faker.date.past(),
            reviewDate: faker.date.past(),
            animal: { id: 1 },
            applicant: { id: 2 },
            reviewer: { user: { id: 1 }, organization: { id: 1 } },
            adoptionStep: {
                organization: { id: 1 },
                specie: { id: 1 },
                number: 1,
            },
        },
        {
            id: 2,
            status: randomStatus,
            reason: faker.lorem.sentence(),
            submissionDate: faker.date.past(),
            reviewDate: faker.date.past(),
            animal: { id: 2 },
            applicant: { id: 3 },
            reviewer: { user: { id: 1 }, organization: { id: 1 } },
            adoptionStep: {
                organization: { id: 1 },
                specie: { id: 2 },
                number: 1,
            },
        },
    ];
    return formAnimalSubmission;
};
