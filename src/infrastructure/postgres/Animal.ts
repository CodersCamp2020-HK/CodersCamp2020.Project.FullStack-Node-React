import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { AnimalAdditionalInfo } from './AnimalAdditionalInfo';
import { AnimalDonation, Goal } from './Donation';

export enum AnimalSpecies {
    CAT = 'cat',
    DOG = 'dog',
}

@Entity()
export class Animal {
    @PrimaryGeneratedColumn()
    id!: number;

    /**
     * The name of the animal used to register its in database.
     */
    @Column({
        length: 50,
    })
    name!: string;

    /**
     * The age of the animal used to register its in database.
     */
    @Column()
    age!: number;

    /**
     * The animal's spieces (cat/dog) used to register its in database.
     */
    @Column({
        type: 'enum',
        enum: AnimalSpecies,
    })
    specie!: AnimalSpecies;

    /**
     * The description of the animal.
     * Extra information deliverd by user
     */
    @Column({
        type: 'text',
    })
    description!: string;

    /**
     * The animal is ready for adoption
     */
    @Column()
    ready_for_adoption!: boolean;

    /**
     * The animal's addition information
     */
    @OneToOne(() => AnimalAdditionalInfo, { cascade: true })
    @JoinColumn()
    additional_info!: AnimalAdditionalInfo;

    @ManyToOne(() => AnimalDonation, (animalDonation) => animalDonation.animal, { cascade: true })
    animalDonation!: AnimalDonation;

    @ManyToOne(() => Goal, (goal) => goal.animal)
    goal!: Goal;
}
