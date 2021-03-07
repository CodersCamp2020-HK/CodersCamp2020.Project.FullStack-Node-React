import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Questionnaire, Form } from './Questionnaire';
import QuestionnaireAnswer from './QuestionnaireAnswer';

@Entity()
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

    @OneToMany(() => QuestionnaireAnswer, (answers) => answers.question)
    answers!: QuestionnaireAnswer;
}
