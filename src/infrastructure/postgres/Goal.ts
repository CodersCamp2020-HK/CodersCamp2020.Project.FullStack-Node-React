import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
import Animal from './Animal';
import Organization from './Organization';
import GoalDonation from './GoalDonation';

@Entity('Goals')
export default class Goal {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => GoalDonation, (goalDonation) => goalDonation.goals)
    gaolDonation!: GoalDonation;

    /**
     * The amount of the one donation.
     */
    @Column()
    amount!: number;

    @OneToMany(() => Animal, (animal) => animal.animalDonation, { cascade: true })
    animals!: Animal[];

    @OneToMany(() => Organization, (organization) => organization.goal, { cascade: true })
    organizations!: Organization[];
}
