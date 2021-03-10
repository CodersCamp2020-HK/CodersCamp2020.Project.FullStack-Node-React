import { Column, Entity, Index, ManyToOne } from 'typeorm';
import OrganizationUser from './OrganizationUser';
import { User } from './User';
import VolunteerHireStep from './VolunteerHireStep';

@Index(['user', 'step'], { unique: true })
@Entity('FormVolunteerSubmissions')
export default class FormVolunteerSubmission {
    @ManyToOne(() => User)
    user!: User;

    @ManyToOne(() => VolunteerHireStep, (step) => step.submissions)
    step!: VolunteerHireStep;

    @Column()
    status!: string;

    @ManyToOne(() => OrganizationUser, (user) => user.volunteerReviews)
    reviewer!: OrganizationUser;
}
