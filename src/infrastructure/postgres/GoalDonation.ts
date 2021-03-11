import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import Goal from './Goal';
import { User } from './User';

@Entity('GoalDonations')
export default class GoalDonation {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => User, (user) => user.goalDonations, { cascade: true })
    user!: User;

    /**
     * The goal of donation.
     */
    @ManyToOne(() => Goal, (goal) => goal.goalDonation, { cascade: true })
    goal!: Goal;

    /**
     * The amount of the one donation.
     */
    @Column()
    amount!: number;
}
