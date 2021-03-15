import { Column, Entity, Index, ManyToOne } from 'typeorm';
import FormQuestion from './FormQuestion';
import FormVolunteerSubmission from './FormVolunteerSubmission';

@Entity('FormVolunteerAnswers')
@Index(['submission', 'question'], { unique: true })
export default class FormVolunteerAnswer {
    @ManyToOne(() => FormVolunteerSubmission, (submission) => submission.answers, { primary: true, nullable: false })
    submission!: FormVolunteerSubmission;

    @ManyToOne(() => FormQuestion, (question) => question.volunteerAnswers, { primary: true, nullable: false })
    question!: FormQuestion;

    @Column()
    answer!: string;
}
