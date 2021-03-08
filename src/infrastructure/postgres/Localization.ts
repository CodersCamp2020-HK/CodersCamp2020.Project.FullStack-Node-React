import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import Organization from './Organization';
import { User } from './User';

@Entity()
export default class Localization {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        type: 'text',
        length: 20,
    })
    country!: string;

    @Column({
        type: 'text',
        length: 20,
    })
    city!: string;

    @Column({
        type: 'text',
        length: 20,
    })
    adress!: string;

    @OneToMany(() => User, (user) => user.localization)
    user!: User;

    @OneToMany(() => Organization, (organization) => organization.localization)
    organization!: Organization;
}
