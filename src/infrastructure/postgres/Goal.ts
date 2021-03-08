import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, Index } from 'typeorm';
import Animal from './Animal';
import Organization from './Organization';
import GoalDonation from './Donation';

@Entity()
@Index(['organization'], { unique: true })
export default class Goal {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => GoalDonation, (goalDonation) => goalDonation.goal)
    gaolDonation!: GoalDonation;

    /**
     * The amount of the one donation.
     */
    @Column({
        length: 10,
    })
    amount!: number;

    @OneToMany(() => Animal, (animal) => animal.animalDonation, { cascade: true })
    animal!: Animal;

    @OneToMany(() => Organization, (organization) => organization.goal)
    organization!: Organization;
}
