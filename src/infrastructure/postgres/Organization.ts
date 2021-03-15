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

    @OneToMany(() => OrganizationDonation, (organizationDonation) => organizationDonation.organization, {
        cascade: true,
    })
    organizationDonations!: OrganizationDonation[];

    @OneToMany(() => Goal, (goal) => goal.organizations)
    goals!: Goal[];

    @ManyToOne(() => Localization, (localization) => localization.organizations)
    localization!: Localization;

    @OneToMany(() => AdoptionStep, (step) => step.organization)
    adoptionSteps!: AdoptionStep[];

    @OneToMany(() => VolunteerHireStep, (volunteer) => volunteer.organization)
    volunteerHireSteps!: VolunteerHireStep[];

    @OneToMany(() => OrganizationUser, (organizationUser) => organizationUser.organization, { nullable: true })
    organizationUsers!: OrganizationUser[];
}
