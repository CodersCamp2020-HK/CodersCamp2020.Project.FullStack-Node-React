import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { AnimalAdditionalInfo } from './AnimalAdditionalInfo';
import AnimalPhoto from './AnimalPhoto';
import Goal from './Goal';
import AnimalDonation from './AnimalDonation';
import QuestionnaireSubmission from './FormSubmission';

export enum AnimalSpecies {
    CAT = 'cat',
    DOG = 'dog',
}

@Entity('Animals')
export default class Animal {
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
    readyForAdoption!: boolean;

    /**
     * The animal's addition information
     */
    @OneToOne(() => AnimalAdditionalInfo, { cascade: true })
    @JoinColumn()
    additionalInfo!: AnimalAdditionalInfo;

    @OneToMany(() => AnimalPhoto, (photos) => photos.animal, { cascade: true })
    photos!: AnimalPhoto[];

    @ManyToOne(() => AnimalDonation, (animalDonation) => animalDonation.animals, { cascade: true })
    animalDonation!: AnimalDonation;

    @ManyToOne(() => Goal, (goal) => goal.animals, { cascade: true })
    goal!: Goal;

    @OneToMany(() => QuestionnaireSubmission, (submission) => submission.animal, { cascade: true })
    submissions!: QuestionnaireSubmission[];
}
