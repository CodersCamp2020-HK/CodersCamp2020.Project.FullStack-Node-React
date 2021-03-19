import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import Animal from './Animal';
import Organization from './Organization';
import GoalDonation from './GoalDonation';
import { Length, Min } from 'class-validator';

@Entity('Goals')
export default class Goal {
    @PrimaryGeneratedColumn()
    id!: number;

    @Length(3, 300)
    @Column()
    description!: string;

    @ManyToOne(() => GoalDonation, (goalDonation) => goalDonation.goal)
    goalDonation!: GoalDonation;

    /**
     * The amount of the one donation.
     */
    @Min(1)
    @Column()
    amount!: number;

    @ManyToOne(() => Animal, (animal) => animal.animalDonations)
    animals!: Animal[];

    @ManyToOne(() => Organization, (organization) => organization.goals)
    organizations!: Organization[];
}
