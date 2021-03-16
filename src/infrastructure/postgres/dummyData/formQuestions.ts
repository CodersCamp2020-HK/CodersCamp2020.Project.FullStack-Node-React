import { DeepPartial } from 'typeorm';
import * as faker from 'faker';
import FormQuestion, { AnswerType } from '../FormQuestion';

export const seedFormQuestion = (amount: number): DeepPartial<FormQuestion>[] => {
    const formQuestion: DeepPartial<FormQuestion>[] = [];

    for (let j = 0; j < 3; j++) {
        let currentEnum: AnswerType = AnswerType.CHECKBOX;
        if (j == 0) {
            currentEnum = AnswerType.CHECKBOX;
        }
        if (j == 1) {
            currentEnum = AnswerType.RADIO;
        }
        if (j == 2) {
            currentEnum = AnswerType.TEXT;
        }
        for (let i = 0; i < amount; i++) {
            formQuestion.push({
                question: faker.hacker.phrase(),
                placeholder: {
                    type: currentEnum,
                    answer:
                        currentEnum == AnswerType.TEXT
                            ? faker.random.word()
                            : [faker.random.word(), faker.random.word()],
                },
                form: { id: i + 1 },
            });
        }
    }

    return formQuestion;
};
