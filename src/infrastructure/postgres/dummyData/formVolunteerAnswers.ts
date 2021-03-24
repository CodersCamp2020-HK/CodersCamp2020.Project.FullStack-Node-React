import { DeepPartial } from 'typeorm';
import FormVolunteerAnswer from '../FormVolunteerAnswer';
import { AnswerType } from '../FormQuestion';

export const seedFormVolunteerAnswer = (): DeepPartial<FormVolunteerAnswer>[] => {
    const formVolunteerAnswer: DeepPartial<FormVolunteerAnswer>[] = [
        {
            question: { id: 6 },
            answer: { type: AnswerType.TEXT, answer: 'Lubię zwierzaki' },
            submission: { id: 1 },
        },
        {
            question: { id: 7 },
            answer: { type: AnswerType.RADIO, answer: 'Tak' },
            submission: { id: 1 },
        },
    ];
    return formVolunteerAnswer;
};
