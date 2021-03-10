import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import Questionnaire, { Form } from './Form';
import FormAnimalAnswer from './FormAnimalAnswer';

@Entity('FormQuestions')
export default class QuestionnaireQuestion {
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
    answers!: FormAnimalAnswer[];
}
