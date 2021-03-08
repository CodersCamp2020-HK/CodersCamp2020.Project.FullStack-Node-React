import { Column, Entity, Index, ManyToOne, PrimaryColumn } from 'typeorm';
import QuestionnaireSubmission from './QuestionaireSubmission';
import QuestionnaireQuestion from './QuestionnaireQuestion';

export interface Question {
    answer: string;
}

@Entity()
@Index(['submission', 'question'], { unique: true })
export default class QuestionnaireAnswer {
    @PrimaryColumn()
    @ManyToOne(() => QuestionnaireSubmission, (submission) => submission.answers)
    submission!: QuestionnaireSubmission;

    @PrimaryColumn()
    @ManyToOne(() => QuestionnaireQuestion, (question) => question.answers)
    question!: QuestionnaireQuestion;

    @Column({ type: 'jsonb' })
    answer!: Question;
}
