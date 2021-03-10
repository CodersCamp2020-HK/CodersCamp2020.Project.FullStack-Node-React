import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import Goal from './Goal';
import { User } from './User';

@Entity()
export default class GoalDonation {
    @PrimaryGeneratedColumn()
    id!: number;

    @OneToMany(() => User, (user) => user.goalDonation)
    users!: User[];

    /**
     * The goal of donation.
     */
    @OneToMany(() => Goal, (goal) => goal.gaolDonation)
    goals!: Goal[];

    /**
     * The amount of the one donation.
     */
    @Column()
    amount!: number;
}
