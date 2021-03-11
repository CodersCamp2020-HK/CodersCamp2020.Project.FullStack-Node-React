import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import User from './User';
import Animal from './Animal';

@Entity('Calendar')
export default class Calendar {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    date!: Date;

    @OneToOne(() => User)
    @JoinColumn()
    user!: number;

    @OneToOne(() => Animal)
    @JoinColumn()
    animal!: number;
}