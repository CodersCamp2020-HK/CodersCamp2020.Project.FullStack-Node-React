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
                animal: { id: i + 1 },
                applicant: { id: i + 1 },
                adoptionStep: {
                    organization: { id: 1 },
                    specie: { id: (i % 2) + 1 },
                    number: i + 1,
                },
            },
        });
    }
    return formAnimalAnswer;
};
