import {
    Column,
    CreateDateColumn,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import FormVolunteerAnswer from './FormVolunteerAnswer';
import OrganizationUser from './OrganizationUser';
import User from './User';
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

    @ManyToOne(() => User, (user) => user.volunteerSubmission, { nullable: false })
    user!: User;

    @ManyToOne(() => VolunteerHireStep, (step) => step.submissions, { nullable: false })
    @JoinColumn()
    step!: VolunteerHireStep;

    @Column({ type: 'enum', enum: VolunteerFormStatus, default: VolunteerFormStatus.IN_PROGRESS })
    status!: string;

    @Column({ nullable: true, default: null })
    reason?: string;

    @ManyToOne(() => OrganizationUser, (user) => user.volunteerReviews, { nullable: true })
    reviewer?: OrganizationUser;

    @OneToMany(() => FormVolunteerAnswer, (answers) => answers.submission, { cascade: true, nullable: true })
    answers?: FormVolunteerAnswer[];

    @CreateDateColumn({ type: 'date' })
    submissionDate!: Date;

    @Column({ type: 'date', nullable: true })
    reviewDate?: Date;
}
