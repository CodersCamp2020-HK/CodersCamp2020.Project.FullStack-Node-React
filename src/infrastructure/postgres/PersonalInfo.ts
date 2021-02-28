import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PersonalInfo {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        length: 50,
    })
    name!: string;

    @Column({
        length: 50,
    })
    surname!: string;

    @Column()
    birthDate!: Date;

    @Column()
    city!: string;

    @Column()
    streetName!: string;

    @Column()
    streetNumber!: number;

    @Column({
        nullable: true,
    })
    roomNumber!: number;

    @Column()
    cityCode!: string;

    @Column()
    telephoneNumber!: number;

    @Column()
    additionalInfo!: string;
}
