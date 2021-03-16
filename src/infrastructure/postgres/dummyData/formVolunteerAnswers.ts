import { DeepPartial } from 'typeorm';
import * as faker from 'faker';
import FormVolunteerAnswer from '../FormVolunteerAnswer';
import { AnswerForm, AnswerType } from '../FormQuestion';

export const seedFormVolunteerAnswer = (amount: number): DeepPartial<FormVolunteerAnswer>[] => {
    const formVolunteerAnswer: DeepPartial<FormVolunteerAnswer>[] = [];
    for (let i = 0; i < amount; i++) {
        const answerObj: AnswerForm = { type: AnswerType.TEXT, answer: faker.random.word() };
        formVolunteerAnswer.push({
            answer: answerObj,
            question: { id: i + 1 },
            submission: {
                id: i + 1,
            },
        });
    }
    return formVolunteerAnswer;
};
