import { DeepPartial } from 'typeorm';
import * as faker from 'faker';
import FormAnimalAnswer from '../FormAnimalAnswer';
import { AnswerForm, AnswerType } from '../FormQuestion';

export const seedFormAnimalAnswer = (amount: number): DeepPartial<FormAnimalAnswer>[] => {
    const formAnimalAnswer: DeepPartial<FormAnimalAnswer>[] = [];
    for (let i = 0; i < amount; i++) {
        const answerObj: AnswerForm = { type: AnswerType.TEXT, answer: faker.random.word() };
        formAnimalAnswer.push({
            answer: answerObj,
            question: { id: i + 1 },
            submission: {
                id: 1,
            },
        });
    }
    return formAnimalAnswer;
};
