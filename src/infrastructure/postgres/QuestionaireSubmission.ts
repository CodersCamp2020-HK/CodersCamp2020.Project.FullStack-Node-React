import { Column, Entity, Index, ManyToOne, OneToMany } from 'typeorm';
import AdoptionStep from './AdoptionStep';
import Animal from './Animal';
import Organization from './Organization';
import QuestionnaireAnswer from './QuestionnaireAnswer';
import { User } from './User';

@Entity()
@Index(['animal', 'applicant', 'adoptionStep', 'organization'], { unique: true })
export default class QuestionnaireSubmission {
    @ManyToOne(() => Animal, (animal) => animal.submission, { primary: true, nullable: false })
    animal!: Animal;

    @ManyToOne(() => User, (user) => user.submission, { primary: true, nullable: false })
    applicant!: User;

    @ManyToOne(() => AdoptionStep, (step) => step.submission, { primary: true, nullable: false })
    adoptionStep!: AdoptionStep;

    @ManyToOne(() => Organization, (organization) => organization.submission, { primary: true, nullable: false })
    organization!: Organization;

    @Column()
    status!: string;

    @ManyToOne(() => User, (user) => user.submissionReview)
    reviewer!: User;

    @OneToMany(() => QuestionnaireAnswer, (answers) => answers.submission)
    answers!: QuestionnaireAnswer;
}
