import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import User from './User';
import Animal from './Animal';
import { IsDate } from 'class-validator';

@Entity('Calendar')
export default class Calendar {
    @PrimaryGeneratedColumn()
    id!: number;

    @IsDate()
    @Column()
    date!: Date;

    @ManyToOne(() => User, (user) => user.meetings)
    user!: User;

    @ManyToOne(() => Animal, (animal) => animal.meetings)
    animal!: Animal;
}
