import { Column, Entity, Index, ManyToOne, OneToMany } from 'typeorm';
import FormVolunteerAnswer from './FormVolunteerAnswer';
import OrganizationUser from './OrganizationUser';
import { User } from './User';
import VolunteerHireStep from './VolunteerHireStep';

@Index(['user', 'step'], { unique: true })
@Entity('FormVolunteerSubmissions')
export default class FormVolunteerSubmission {
    @ManyToOne(() => User, (user) => user.volunteerSubmission, { primary: true, nullable: false })
    user!: User;

    @ManyToOne(() => VolunteerHireStep, (step) => step.submissions, { primary: true, nullable: false })
    step!: VolunteerHireStep;

    @Column()
    status!: string;

    @ManyToOne(() => OrganizationUser, (user) => user.volunteerReviews)
    reviewer!: OrganizationUser;

    @OneToMany(() => FormVolunteerAnswer, (answers) => answers.submission, { cascade: true })
    answers!: FormVolunteerAnswer[];
}
