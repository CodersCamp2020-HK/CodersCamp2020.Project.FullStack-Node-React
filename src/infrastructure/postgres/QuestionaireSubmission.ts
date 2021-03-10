import { Column, Entity, Index, ManyToOne, OneToMany } from 'typeorm';
import AdoptionStep from './AdoptionStep';
import Animal from './Animal';
import QuestionnaireAnswer from './QuestionnaireAnswer';
import { User } from './User';

@Entity()
@Index(['animal', 'applicant', 'adoptionStep'], { unique: true })
export default class QuestionnaireSubmission {
    @ManyToOne(() => Animal, (animal) => animal.submission, { primary: true, nullable: false })
    animal!: Animal;

    @ManyToOne(() => User, (user) => user.submission, { primary: true, nullable: false })
    applicant!: User;

    @ManyToOne(() => AdoptionStep, (step) => step.submission, { primary: true, nullable: false })
    adoptionStep!: AdoptionStep;

    @Column()
    status!: string;

    @ManyToOne(() => User, (user) => user.submissionReview)
    reviewer!: User;

    @OneToMany(() => QuestionnaireAnswer, (answers) => answers.submission)
    answers!: QuestionnaireAnswer[];
}
