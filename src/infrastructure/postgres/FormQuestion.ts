import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import Questionnaire, { Form } from './Form';
import FormAnimalAnswer from './FormAnimalAnswer';
import FormVolunteerAnswer from './FormVolunteerAnswer';

@Entity('FormQuestions')
export default class FormQuestion {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Questionnaire, (questionnaire) => questionnaire.questions)
    questionnaire!: Questionnaire;

    @Column()
    question!: string;

    @Column({
        type: 'json',
    })
    form!: Form;

    @OneToMany(() => FormAnimalAnswer, (answers) => answers.question)
    animalAnswers!: FormAnimalAnswer[];

    @OneToMany(() => FormVolunteerAnswer, (answers) => answers.question)
    volunteerAnswers!: FormVolunteerAnswer[];
}
