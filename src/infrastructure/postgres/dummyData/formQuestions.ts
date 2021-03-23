import { DeepPartial } from 'typeorm';
import FormQuestion, { AnswerType } from '../FormQuestion';

export const seedFormQuestion = (): DeepPartial<FormQuestion>[] => {
    const formQuestion: DeepPartial<FormQuestion>[] = [
        {
            id: 1,
            question: 'Czy mają państwo dzieci?',
            placeholder: {
                type: AnswerType.RADIO,
                answer: ['Tak', 'Nie'],
            },
            form: { id: 1 },
        },
        {
            id: 2,
            question: 'Czy mają państwo uczulenie na sierść',
            placeholder: {
                type: AnswerType.RADIO,
                answer: ['Tak', 'Nie', 'Nie wiem'],
            },
            form: { id: 1 },
        },
        {
            id: 3,
            question: 'Czy mają państwo dzieci?',
            placeholder: {
                type: AnswerType.RADIO,
                answer: ['Tak', 'Nie'],
            },
            form: { id: 2 },
        },
        {
            id: 4,
            question: 'Czy mają państwo uczulenie na sierść',
            placeholder: {
                type: AnswerType.RADIO,
                answer: ['Tak', 'Nie', 'Nie wiem'],
            },
            form: { id: 2 },
        },
        {
            id: 5,
            question: 'Czemu akurat teraz zdecydowali się Państwo na adopcję psa?',
            placeholder: {
                type: AnswerType.TEXT,
                answer: '...',
            },
            form: { id: 1 },
        },
        {
            id: 6,
            question: 'Czemu chcą Państwo zostać wolontariuszem?',
            placeholder: {
                type: AnswerType.TEXT,
                answer: '...',
            },
            form: { id: 3 },
        },
        {
            id: 7,
            question: 'Czy pracowali Państwo charytatywnie?',
            placeholder: {
                type: AnswerType.RADIO,
                answer: ['Tak', 'Nie'],
            },
            form: { id: 3 },
        },
    ];

    return formQuestion;
};
