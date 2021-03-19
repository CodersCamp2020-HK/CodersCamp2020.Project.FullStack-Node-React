import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import Animal from './Animal';
import User from './User';
import { Min, Max } from 'class-validator';

@Entity('AnimalDonations')
export default class AnimalDonation {
    @PrimaryGeneratedColumn()
    id!: number;

    /**
     * The amount of the animal donation.
     */
    @Min(1)
    @Max(1000000)
    @Column()
    amount!: number;

    @ManyToOne(() => User, (user) => user.animalDonations)
    users!: User[];

    @ManyToOne(() => Animal, (animal) => animal.animalDonations, { cascade: true })
    animals!: Animal[];
}
