import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import AdoptionStep from './AdoptionStep';
import QuestionnaireQuestion from './QuestionnaireQuestion';

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

@Entity()
export default class Questionnaire {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @OneToMany(() => QuestionnaireQuestion, (question) => question.questionnaire, { cascade: true })
    questions!: QuestionnaireQuestion[];

    @ManyToOne(() => AdoptionStep, (adoption) => adoption.form)
    step!: AdoptionStep;
}
