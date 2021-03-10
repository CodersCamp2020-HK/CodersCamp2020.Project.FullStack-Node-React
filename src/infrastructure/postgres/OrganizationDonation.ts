import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
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

    @OneToMany(() => User, (user) => user.organizationDonation)
    users!: User[];

    @OneToMany(() => Organization, (organization) => organization.organizatonDonation)
    organizations!: Organization[];
}
