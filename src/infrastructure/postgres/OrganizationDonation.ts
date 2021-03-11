import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import Organization from './Organization';
import { User } from './User';

@Entity('OrganizationDonations')
export default class OrganizationDonation {
    @PrimaryGeneratedColumn()
    id!: number;

    /**
     * The amount of the organization donation.
     */
    @Column()
    amount!: number;

    @ManyToOne(() => User, (user) => user.organizationDonations)
    user!: User;

    @ManyToOne(() => Organization, (organization) => organization.organizationDonations)
    organization!: Organization;
}
