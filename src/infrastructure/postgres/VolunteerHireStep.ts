import { Column, Entity, Index, ManyToOne, PrimaryColumn } from 'typeorm';
import Form from './Form';
import Organization from './Organization';
import { User } from './User';

@Entity('VolunteerHireSteps')
@Index(['organization', 'user', 'number'], { unique: true })
export default class VolunteerHireStep {
    @Column()
    name!: string;

    @Column()
    description!: string;

    @PrimaryColumn()
    @ManyToOne(() => Organization, (organization) => organization.volunteerHireSteps)
    organization!: Organization;

    @PrimaryColumn()
    @ManyToOne(() => User, (user) => user.steps)
    user!: User;

    @PrimaryColumn()
    number!: number;

    @ManyToOne(() => Form, (form) => form.volunteerHireSteps)
    form!: Form;
}
