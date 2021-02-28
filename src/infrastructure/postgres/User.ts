import { Entity, Column, PrimaryGeneratedColumn, Generated, CreateDateColumn } from 'typeorm';

export enum UserType {
    ADMIN = 'admin',
    EMPLOYEE = 'employee',
    NORMAL = 'normal',
    VOLUNTEER = 'volunteer',
}

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        length: 50,
        nullable: true,
        default: null,
    })
    name!: string;

    @Column({
        length: 50,
        nullable: true,
        default: null,
    })
    surname!: string;

    @Column({
        type: 'enum',
        enum: UserType,
        default: UserType.NORMAL,
    })
    type!: UserType;

    @Column({
        nullable: true,
        default: null,
    })
    phone!: number;

    @Column({
        length: 50,
        unique: true,
    })
    mail!: string;

    @Column({
        length: 255,
    })
    password!: string;

    @CreateDateColumn()
    registerDate!: Date;

    @Column({ default: false })
    activated!: boolean;

    @Column()
    @Generated('uuid')
    uuid!: string;
}
