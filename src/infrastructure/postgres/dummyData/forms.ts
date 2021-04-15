import { DeepPartial } from 'typeorm';
import Form from '../Form';

export const seedForms = (): DeepPartial<Form>[] => {
    const form: DeepPartial<Form>[] = [
        {
            id: 1,
            name: 'Formularz adopcyjny',
        },
        {
            id: 2,
            name: 'Formularz na wolontariusza',
        },
    ];
    return form;
};
