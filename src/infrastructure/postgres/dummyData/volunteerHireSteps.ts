import { DeepPartial } from 'typeorm';
import * as faker from 'faker';
import VolunteerHireStep from '../VolunteerHireStep';

export const seedVolunteerHireStep = (amount: number): DeepPartial<VolunteerHireStep>[] => {
    const volunteerHireStep: DeepPartial<VolunteerHireStep>[] = [];
    for (let i = 0; i < amount; i++) {
        volunteerHireStep.push({
            name: faker.name.firstName(),
            description: faker.lorem.sentence(),
            number: i + 1,
            organization: { id: 1 },
            // user: { id: i + 1 },
            form: { id: i + 1 },
        });
    }
    return volunteerHireStep;
};
