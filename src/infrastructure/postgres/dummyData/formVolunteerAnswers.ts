import { DeepPartial } from 'typeorm';
import * as faker from 'faker';
import FormVolunteerAnswer from '../FormVolunteerAnswer';

export const seedFormVolunteerAnswer = (amount: number): DeepPartial<FormVolunteerAnswer>[] => {
    const formVolunteerAnswer: DeepPartial<FormVolunteerAnswer>[] = [];
    for (let i = 0; i < amount; i++) {
        formVolunteerAnswer.push({
            answer: faker.lorem.sentence(),
            question: { id: i + 1 },
            submission: {
                user: { id: 1 },
                step: {
                    organization: { id: 1 },
                    number: i + 1,
                },
            },
        });
    }
    return formVolunteerAnswer;
};
