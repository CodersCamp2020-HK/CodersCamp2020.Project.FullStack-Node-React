import { Column, Entity, Index, ManyToOne, OneToMany } from 'typeorm';
import Form from './Form';
import FormVolunteerSubmission from './FormVolunteerSubmission';
import Organization from './Organization';
import User from './User';

@Entity('VolunteerHireSteps')
@Index(['organization', 'number', 'user'], { unique: true })
export default class VolunteerHireStep {
    @Column()
    name!: string;

    @Column()
    description!: string;

    @ManyToOne(() => Organization, (organization) => organization.volunteerHireSteps, {
        primary: true,
        nullable: false,
    })
    organization!: Organization;

    @ManyToOne(() => User, (user) => user.steps, { primary: true, nullable: false })
    user!: User;

    @Column({ primary: true, nullable: false })
    number!: number;

    @ManyToOne(() => Form, (form) => form.volunteerHireSteps)
    form!: Form;

    @OneToMany(() => FormVolunteerSubmission, (submission) => submission.step, { cascade: true })
    submissions!: FormVolunteerSubmission[];
}
