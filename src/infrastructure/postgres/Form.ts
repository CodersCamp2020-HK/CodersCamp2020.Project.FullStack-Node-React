import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import AdoptionStep from './AdoptionStep';
import FormQuestion from './FormQuestion';

interface TextAnswer {
    placeholder: string;
}

interface EnumAnswer {
    values: string[];
}

type FormType = 'TextAnswer' | 'EnumAnswer';

export interface Form {
    type: FormType;
    data: TextAnswer | EnumAnswer;
}

@Entity('Forms')
export default class Questionnaire {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @OneToMany(() => FormQuestion, (question) => question.questionnaire, { cascade: true })
    questions!: FormQuestion[];

    @OneToMany(() => AdoptionStep, (adoption) => adoption.form)
    steps!: AdoptionStep[];
}
