import { Column, Entity, Index, ManyToOne, OneToMany } from 'typeorm';
import AdoptionStep from './AdoptionStep';
import { Animal } from './Animal';
import { Organization } from './Organization';
import { User } from './User';

@Entity()
@Index(['animal', 'applicant', 'adoptionStep', 'organization'], { unique: true })
export default class QuestionnaireSubmission {
    @ManyToOne(() => Animal, (animal) => animal.submission)
    animal!: Animal;

    @ManyToOne(() => User, (user) => user.submission)
    applicant!: User;

    @ManyToOne(() => AdoptionStep, (step) => step.submission)
    adoptionStep!: AdoptionStep;

    @ManyToOne(() => Organization, (organization) => organization.submission)
    organization!: Organization;

    @Column()
    status!: string;

    @OneToMany(() => User, (user) => user.submissionReview)
    reviewer!: User;
}
