import { DeepPartial } from 'typeorm';
import Form from '../Form';
import * as faker from 'faker';

export const seedForms = (amount: number): DeepPartial<Form>[] => {
    const forms: DeepPartial<Form>[] = [];
    for (let i = 0; i < amount; i++) {
        forms.push({
            name: faker.company.companyName(),
        });
    }
    return forms;
};
