import { DeepPartial } from 'typeorm';
import * as faker from 'faker';
import FormQuestion from '../FormQuestion';
import { AnswerForm, TextAnswer, EnumAnswer } from '../FormQuestion';

export const seedFormQuestion = (amount: number): DeepPartial<FormQuestion>[] => {
    const formQuestion: DeepPartial<FormQuestion>[] = [];
    for (let i = 0; i < amount; i++) {
        formQuestion.push({
            question: faker.lorem.sentence(),
            placeholder: {},
        });
    }
    return formQuestion;
};
