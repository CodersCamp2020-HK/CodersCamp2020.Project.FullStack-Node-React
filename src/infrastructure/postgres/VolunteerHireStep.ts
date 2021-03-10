import { Column, Entity, ManyToOne } from 'typeorm';
import Organization from './Organization';

@Entity('VolunteerHireSteps')
export default class VolunteerHireStep {
    @Column()
    name!: string;

    @Column()
    description!: string;

    @ManyToOne(() => Organization, (organization) => organization.volunteerHireSteps)
    organization!: Organization;
}
