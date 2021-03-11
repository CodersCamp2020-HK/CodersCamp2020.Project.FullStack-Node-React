import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import Animal from './Animal';
import Organization from './Organization';
import GoalDonation from './GoalDonation';

@Entity('Goals')
export default class Goal {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ length: 200 })
    description!: string;

    @ManyToOne(() => GoalDonation, (goalDonation) => goalDonation.goal)
    goalDonation!: GoalDonation;

    /**
     * The amount of the one donation.
     */
    @Column()
    amount!: number;

    @ManyToOne(() => Animal, (animal) => animal.animalDonations, { cascade: true })
    animals!: Animal[];

    @ManyToOne(() => Organization, (organization) => organization.goals, { cascade: true })
    organizations!: Organization[];
}
