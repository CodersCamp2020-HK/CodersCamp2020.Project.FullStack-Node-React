import { Column, Entity, Index, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import FormVolunteerAnswer from './FormVolunteerAnswer';
import OrganizationUser from './OrganizationUser';
import { User } from './User';
import VolunteerHireStep from './VolunteerHireStep';

@Index(['user', 'step'], { unique: true })
@Entity('FormVolunteerSubmissions')
export default class FormVolunteerSubmission {
    @PrimaryColumn()
    @ManyToOne(() => User)
    user!: User;

    @PrimaryColumn()
    @ManyToOne(() => VolunteerHireStep, (step) => step.submissions)
    step!: VolunteerHireStep;

    @Column()
    status!: string;

    @ManyToOne(() => OrganizationUser, (user) => user.volunteerReviews)
    reviewer!: OrganizationUser;

    @OneToMany(() => FormVolunteerAnswer, (answers) => answers.submission, { cascade: true })
    answers!: FormVolunteerAnswer[];
}
