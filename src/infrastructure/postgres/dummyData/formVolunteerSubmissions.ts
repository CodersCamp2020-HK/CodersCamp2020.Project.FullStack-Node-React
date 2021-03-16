import { DeepPartial } from 'typeorm';
import * as faker from 'faker';
import FormVolunteerSubmission from '../FormVolunteerSubmission';
import { VolunteerFormStatus } from '../FormVolunteerSubmission';

export const seedFormVolunteerSubmission = (amount: number): DeepPartial<FormVolunteerSubmission>[] => {
    const formVolunteerSubmission: DeepPartial<FormVolunteerSubmission>[] = [];
    for (let i = 0; i < amount; i++) {
        const randomStatus = faker.random.arrayElement(Object.values(VolunteerFormStatus));
        formVolunteerSubmission.push({
            status: randomStatus,
            reason: faker.lorem.sentence(),
            submissionDate: faker.date.past(),
            reviewDate: faker.date.recent(3),
            user: { id: i + 1 },
            step: {
                organization: { id: 1 },
                number: 1,
            },
            reviewer: {
                user: { id: i + 1 },
                organization: { id: 1 },
            },
        });
    }
    return formVolunteerSubmission;
};
