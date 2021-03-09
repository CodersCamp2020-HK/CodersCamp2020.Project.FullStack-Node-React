import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
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

    @OneToMany(() => AdoptionStep, (adoption) => adoption.form)
    // @JoinColumn([
    //     { name: 'organization', referencedColumnName: 'organization' },
    //     { name: 'specie', referencedColumnName: 'specie' },
    //     { name: 'number', referencedColumnName: 'number' },
    // ])
    steps!: AdoptionStep[];
}
