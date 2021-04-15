import { DeepPartial } from 'typeorm';
import FormAnimalAnswer from '../FormAnimalAnswer';
import { AnswerType } from '../FormQuestion';

export const seedFormAnimalAnswer = (): DeepPartial<FormAnimalAnswer>[] => {
    const formAnimalAnswer: DeepPartial<FormAnimalAnswer>[] = [
        {
            question: { id: 1 },
            answer: { type: AnswerType.RADIO, answer: 'Tak' },
            submission: { id: 1 },
        },
        {
            question: { id: 2 },
            answer: { type: AnswerType.RADIO, answer: 'Nie wiem' },
            submission: { id: 1 },
        },
        {
            question: { id: 3 },
            answer: { type: AnswerType.RADIO, answer: 'Bo akurat nie mam psa' },
            submission: { id: 1 },
        },
        {
            question: { id: 1 },
            answer: { type: AnswerType.RADIO, answer: 'Nie' },
            submission: { id: 2 },
        },
        {
            question: { id: 2 },
            answer: { type: AnswerType.RADIO, answer: 'Nie' },
            submission: { id: 2 },
        },
        {
            question: { id: 3 },
            answer: { type: AnswerType.RADIO, answer: 'Lubię placki' },
            submission: { id: 2 },
        },
    ];
    return formAnimalAnswer;
};
