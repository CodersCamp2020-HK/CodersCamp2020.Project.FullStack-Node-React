import { Column, Entity, Index, ManyToOne } from 'typeorm';
import FormAnimalSubmission from './FormAnimalSubmission';
import QuestionnaireQuestion from './FormQuestion';

export interface Question {
    answer: string;
}

@Entity('FormAnimalAnswers')
@Index(['submission', 'question'], { unique: true })
export default class FormAnimalAnswer {
    @ManyToOne(() => FormAnimalSubmission, (submission) => submission.answers, { primary: true, nullable: false })
    submission!: FormAnimalSubmission;

    @ManyToOne(() => QuestionnaireQuestion, (question) => question.answers, { primary: true, nullable: false })
    question!: QuestionnaireQuestion;

    @Column({ type: 'jsonb' })
    answer!: Question;
}
