import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import Organization from './Organization';
import { User } from './User';

@Entity()
export default class OrganizationDonation {
    @PrimaryGeneratedColumn()
    id!: number;

    /**
     * The amount of the organization donation.
     */
    @Column({
        length: 10,
    })
    amount!: number;

    @OneToMany(() => User, (user) => user.organizationDonation)
    user!: User[];

    @OneToMany(() => Organization, (organization) => organization.organizatonDonation)
    organization!: Organization[];
}
