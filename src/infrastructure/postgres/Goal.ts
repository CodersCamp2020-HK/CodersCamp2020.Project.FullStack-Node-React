import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
import Animal from './Animal';
import Organization from './Organization';
import GoalDonation from './GoalDonation';

@Entity()
export default class Goal {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => GoalDonation, (goalDonation) => goalDonation.goal)
    gaolDonation!: GoalDonation;

    /**
     * The amount of the one donation.
     */
    @Column()
    amount!: number;

    @OneToMany(() => Animal, (animal) => animal.animalDonation)
    animal!: Animal;

    @OneToMany(() => Organization, (organization) => organization.goal)
    organization!: Organization;
}
