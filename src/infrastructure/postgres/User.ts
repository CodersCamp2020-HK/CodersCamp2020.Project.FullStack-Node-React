import { Entity, Column, PrimaryGeneratedColumn, Generated, CreateDateColumn } from 'typeorm';

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
        length: 50,
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
