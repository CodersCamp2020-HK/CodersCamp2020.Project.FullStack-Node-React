import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import Organization from './Organization';
import User from './User';
import { Length } from 'class-validator';

@Entity('Localizations')
export default class Localization {
    @PrimaryGeneratedColumn()
    id!: number;

    @Length(3, 100)
    @Column({
        type: 'varchar',
        length: 50,
    })
    country!: string;

    @Column({
        type: 'varchar',
        length: 50,
    })
    city!: string;

    @Column({
        type: 'varchar',
        length: 50,
    })
    address!: string;

    @OneToMany(() => User, (user) => user.localization, { nullable: true, cascade: true })
    users?: User[];

    @OneToMany(() => Organization, (organization) => organization.localization, { nullable: true, cascade: true })
    organizations?: Organization[];
}
