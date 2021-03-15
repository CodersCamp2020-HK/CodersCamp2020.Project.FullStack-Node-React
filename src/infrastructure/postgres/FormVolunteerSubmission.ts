import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import FormVolunteerAnswer from './FormVolunteerAnswer';
import OrganizationUser from './OrganizationUser';
import VolunteerHireStep from './VolunteerHireStep';

export enum VolunteerFormStatus {
    IN_PROGRESS = 'in progress',
    REJECTED = 'rejected',
    ACCEPTED = 'accepted',
}

@Entity('FormVolunteerSubmissions')
@Index(['user', 'step'], { unique: true })
export default class FormVolunteerSubmission {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => VolunteerHireStep, (step) => step.submissions, { nullable: false })
    step!: VolunteerHireStep;

    @Column({ type: 'enum', enum: VolunteerFormStatus, default: VolunteerFormStatus.IN_PROGRESS })
    status!: VolunteerFormStatus;

    @Column({ nullable: true, default: null })
    reason?: string;

    @ManyToOne(() => OrganizationUser, (user) => user.volunteerReviews, { nullable: true })
    reviewer?: OrganizationUser;

    @OneToMany(() => FormVolunteerAnswer, (answers) => answers.submission, { cascade: true })
    answers!: FormVolunteerAnswer[];

    @CreateDateColumn({ type: 'date' })
    submissionDate!: Date;

    @Column({ type: 'date', nullable: true })
    reviewDate?: Date;
}
