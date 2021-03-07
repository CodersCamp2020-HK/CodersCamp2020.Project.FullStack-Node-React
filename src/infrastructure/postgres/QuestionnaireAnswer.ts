import { Column, Entity, ManyToOne } from 'typeorm';
import QuestionnaireSubmission from './QuestionaireSubmission';
import QuestionnaireQuestion from './QuestionnaireQuestion';

export interface Question {
    answer: string;
}

@Entity()
export default class QuestionnaireAnswer {
    @ManyToOne(() => QuestionnaireSubmission, (submission) => submission.answers)
    submission!: QuestionnaireSubmission;

    @ManyToOne(() => QuestionnaireQuestion, (question) => question.answers)
    question!: QuestionnaireQuestion;

    @Column({ type: 'jsonb' })
    answer!: Question;
}
