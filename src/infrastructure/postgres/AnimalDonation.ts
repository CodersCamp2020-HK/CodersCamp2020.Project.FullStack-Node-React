import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
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

    @OneToMany(() => User, (user) => user.animalDonation)
    users!: User[];

    @OneToMany(() => Animal, (animal) => animal.animalDonation)
    animals!: Animal[];
}
