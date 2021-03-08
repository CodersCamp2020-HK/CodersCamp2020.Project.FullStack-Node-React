import { Column, Entity, Index, ManyToOne } from 'typeorm';
import QuestionnaireSubmission from './QuestionaireSubmission';
import QuestionnaireQuestion from './QuestionnaireQuestion';

export interface Question {
    answer: string;
}

@Entity()
@Index(['submission', 'question'], { unique: true })
export default class QuestionnaireAnswer {
    @ManyToOne(() => QuestionnaireSubmission, (submission) => submission.answers, { primary: true, nullable: false })
    submission!: QuestionnaireSubmission;

    @ManyToOne(() => QuestionnaireQuestion, (question) => question.answers, { primary: true, nullable: false })
    question!: QuestionnaireQuestion;

    @Column({ type: 'jsonb' })
    answer!: Question;
}
