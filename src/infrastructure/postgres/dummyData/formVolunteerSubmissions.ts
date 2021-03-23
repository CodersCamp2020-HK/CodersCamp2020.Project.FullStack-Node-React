import { DeepPartial } from 'typeorm';
import * as faker from 'faker';
import FormVolunteerSubmission from '../FormVolunteerSubmission';
import { VolunteerFormStatus } from '../FormVolunteerSubmission';

export const seedFormVolunteerSubmission = (): DeepPartial<FormVolunteerSubmission>[] => {
    const randomStatus = faker.random.arrayElement(Object.values(VolunteerFormStatus));
    const formVolunteerSubmission: DeepPartial<FormVolunteerSubmission>[] = [
        {
            id: 1,
            status: randomStatus,
            reason: faker.lorem.sentence(),
            submissionDate: faker.date.past(),
            reviewDate: faker.date.recent(3),
            user: { id: 8 },
            step: {
                organization: { id: 1 },
                number: 1,
            },
            reviewer: {
                user: { id: 2 },
                organization: { id: 1 },
            },
        },
    ];
    return formVolunteerSubmission;
};
