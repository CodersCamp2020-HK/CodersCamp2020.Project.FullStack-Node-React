import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import Animal from './Animal';
import { User } from './User';

@Entity('AnimalDonations')
export default class AnimalDonation {
    @PrimaryGeneratedColumn()
    id!: number;

    /**
     * The amount of the animal donation.
     */
    @Column()
    amount!: number;

    @ManyToOne(() => User, (user) => user.animalDonations, { cascade: true })
    users!: User[];

    @ManyToOne(() => Animal, (animal) => animal.animalDonations, { cascade: true })
    animals!: Animal[];
}
