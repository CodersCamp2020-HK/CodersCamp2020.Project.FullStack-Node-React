import { Column, Entity, Index, ManyToOne, PrimaryColumn } from 'typeorm';
import { JsonAnswer } from './FormAnimalAnswer';
import FormQuestion from './FormQuestion';
import FormVolunteerSubmission from './FormVolunteerSubmission';

@Entity('FormVolunteerAnswers')
@Index(['submission', 'question'], { unique: true })
export default class FormVolunteerAnswer {
    @PrimaryColumn()
    @ManyToOne(() => FormVolunteerSubmission, (submission) => submission.answers)
    submission!: FormVolunteerSubmission;

    @PrimaryColumn()
    @ManyToOne(() => FormQuestion, (question) => question.volunteerAnswers)
    question!: FormQuestion;

    @Column({ type: 'jsonb' })
    answer!: JsonAnswer;
}
