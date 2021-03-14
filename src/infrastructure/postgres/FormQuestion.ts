import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import Form from './Form';
import FormAnimalAnswer from './FormAnimalAnswer';
import FormVolunteerAnswer from './FormVolunteerAnswer';

export enum AnswerType {
    CHECKBOX = 'checkbox',
    RADIO = 'radio',
    TEXT = 'text',
}

export interface AnswerForm {
    type: AnswerType;
    answer: string | string[];
}

@Entity('FormQuestions')
export default class FormQuestion {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Form, (form) => form.questions)
    form!: Form;

    @Column()
    question!: string;

    @Column({
        type: 'json',
    })
    placeholder!: AnswerForm;

    @OneToMany(() => FormAnimalAnswer, (answers) => answers.question)
    animalAnswers!: FormAnimalAnswer[];

    @OneToMany(() => FormVolunteerAnswer, (answers) => answers.question)
    volunteerAnswers!: FormVolunteerAnswer[];
}
