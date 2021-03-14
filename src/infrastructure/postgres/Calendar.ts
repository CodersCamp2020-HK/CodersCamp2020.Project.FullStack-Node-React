import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import User from './User';
import Animal from './Animal';

@Entity('Calendar')
export default class Calendar {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    date!: Date;

    @ManyToOne(() => User, (user) => user.meetings)
    user!: User;

    @ManyToOne(() => Animal, (animal) => animal.meetings)
    animal!: Animal;
}
