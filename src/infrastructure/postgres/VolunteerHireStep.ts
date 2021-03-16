import { Column, Entity, Index, ManyToOne, OneToOne } from 'typeorm';
import Form from './Form';
import FormVolunteerSubmission from './FormVolunteerSubmission';
import Organization from './Organization';

@Entity('VolunteerHireSteps')
@Index(['organization', 'number'], { unique: true })
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

    @Column({ primary: true, nullable: false })
    number!: number;

    @ManyToOne(() => Form, (form) => form.volunteerHireSteps)
    form!: Form;

    @OneToOne(() => FormVolunteerSubmission, (submission) => submission.step)
    submission!: FormVolunteerSubmission;
}
