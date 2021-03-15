import { Column, CreateDateColumn, Entity, Index, ManyToOne, OneToMany } from 'typeorm';
import FormVolunteerAnswer from './FormVolunteerAnswer';
import OrganizationUser from './OrganizationUser';
import User from './User';
import VolunteerHireStep from './VolunteerHireStep';

export enum VolunteerFormStatus {
    IN_PROGRESS = 'in progress',
    REJECTED = 'rejected',
    ACCEPTED = 'accepted',
}

@Index(['user', 'step'], { unique: true })
@Entity('FormVolunteerSubmissions')
export default class FormVolunteerSubmission {
    @ManyToOne(() => User, (user) => user.volunteerSubmission, { primary: true, nullable: false })
    user!: User;

    @ManyToOne(() => VolunteerHireStep, (step) => step.submissions, { primary: true, nullable: false })
    step!: VolunteerHireStep;

    @Column({ type: 'enum', enum: VolunteerFormStatus })
    status!: string;

    @Column({ nullable: true, default: null })
    reason!: string;

    @ManyToOne(() => OrganizationUser, (user) => user.volunteerReviews)
    reviewer!: OrganizationUser;

    @OneToMany(() => FormVolunteerAnswer, (answers) => answers.submission, { cascade: true })
    answers!: FormVolunteerAnswer[];

    @CreateDateColumn({ type: 'date' })
    submissionDate!: Date;

    @Column({ type: 'date', nullable: true })
    reviewDate?: Date;
}
