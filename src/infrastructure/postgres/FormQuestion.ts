import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import Form from './Form';
import FormAnimalAnswer from './FormAnimalAnswer';
import FormVolunteerAnswer from './FormVolunteerAnswer';

interface TextAnswer {
    placeholder: string;
}

interface EnumAnswer {
    values: string[];
}

type FormType = 'TextAnswer' | 'EnumAnswer';

export interface AnswerForm {
    type: FormType;
    data: TextAnswer | EnumAnswer;
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

    @OneToMany(() => FormAnimalAnswer, (answers) => answers.question, { cascade: true })
    animalAnswers!: FormAnimalAnswer[];

    @OneToMany(() => FormVolunteerAnswer, (answers) => answers.question, { cascade: true })
    volunteerAnswers!: FormVolunteerAnswer[];
}
