import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import FormVolunteerAnswer from './FormVolunteerAnswer';
import OrganizationUser from './OrganizationUser';
import VolunteerHireStep from './VolunteerHireStep';
import { IsDate, Length } from 'class-validator';

export enum VolunteerFormStatus {
    IN_PROGRESS = 'in progress',
    REJECTED = 'rejected',
    ACCEPTED = 'accepted',
}

@Entity('FormVolunteerSubmissions')
export default class FormVolunteerSubmission {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => VolunteerHireStep, (step) => step.submissions, { nullable: false })
    step!: VolunteerHireStep;

    @Column({ type: 'enum', enum: VolunteerFormStatus })
    status!: string;

    @Length(3, 300)
    @Column({ nullable: true, default: null })
    reason!: string;

    @ManyToOne(() => OrganizationUser, (user) => user.volunteerReviews)
    reviewer!: OrganizationUser;

    @OneToMany(() => FormVolunteerAnswer, (answers) => answers.submission, { cascade: true })
    answers!: FormVolunteerAnswer[];

    @IsDate()
    @CreateDateColumn()
    submissionDate!: Date;

    @IsDate()
    @Column({ nullable: true })
    reviewDate?: Date;
}
