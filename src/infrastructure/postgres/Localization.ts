import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import Organization from './Organization';
import { User } from './User';

@Entity('Localizations')
export default class Localization {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        type: 'varchar',
        length: 30,
    })
    country!: string;

    @Column({
        type: 'varchar',
        length: 30,
    })
    city!: string;

    @Column({
        type: 'varchar',
        length: 50,
    })
    address!: string;

    @OneToMany(() => User, (user) => user.localization, { nullable: true })
    users!: User[];

    @OneToMany(() => Organization, (organization) => organization.localization, { nullable: true })
    organizations!: Organization[];
}