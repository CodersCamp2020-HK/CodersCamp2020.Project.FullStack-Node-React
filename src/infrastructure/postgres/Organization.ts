import Goal from './Goal';
import OrganizationDonation from './OrganizationDonation';
import Localization from './Localization';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import AdoptionStep from './AdoptionStep';
import VolunteerHireStep from './VolunteerHireStep';
import OrganizationUser from './OrganizationUser';

@Entity('Organizations')
export default class Organization {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        length: 50,
        nullable: true,
        default: null,
    })
    name?: string;

    /**
     * The short description of the organization.
     */
    @Column({
        type: 'text',
    })
    description!: string;

    /**
     * The unique KRS number of organization .
     */
    @Column()
    krsNumber!: number;

    @ManyToOne(() => OrganizationDonation, (organizationDonation) => organizationDonation.organizations, {
        cascade: true,
    })
    organizationDonation!: OrganizationDonation;

    @ManyToOne(() => Goal, (goal) => goal.organizations)
    goal!: Goal;

    @ManyToOne(() => Localization, (localization) => localization.organizations)
    localization!: Localization;

    @OneToMany(() => AdoptionStep, (step) => step.organization, { cascade: true })
    adoptionSteps!: AdoptionStep[];

    @OneToMany(() => VolunteerHireStep, (volunteer) => volunteer.organization, { cascade: true })
    volunteerHireSteps!: VolunteerHireStep[];

    @OneToMany(() => OrganizationUser, (organizationUser) => organizationUser.organization, { cascade: true })
    organizationUsers!: OrganizationUser[];
}
