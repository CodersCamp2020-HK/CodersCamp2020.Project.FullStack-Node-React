import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import AnimalAdditionalInfo from './AnimalAdditionalInfo';
import { AnimalPhoto, AnimalThumbnailPhoto } from './AnimalPhoto';
import Goal from './Goal';
import AnimalDonation from './AnimalDonation';
import FormAnimalSubmission from './FormAnimalSubmission';
import AnimalHandler from './AnimalHandler';
import Specie from './Specie';

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
    @OneToOne(() => Specie, { cascade: true })
    @JoinColumn()
    specie!: Specie;

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

    @OneToOne(() => AnimalThumbnailPhoto, (thumbnail: AnimalThumbnailPhoto) => thumbnail.animal, {
        cascade: true,
        eager: true,
    })
    @JoinColumn()
    thumbnail!: AnimalThumbnailPhoto;

    @OneToMany(() => AnimalPhoto, (photo: AnimalPhoto) => photo.animal, { cascade: true })
    @JoinColumn()
    photos!: AnimalPhoto[];

    @OneToMany(() => AnimalDonation, (animalDonation) => animalDonation.animals)
    animalDonations!: AnimalDonation[];

    @OneToMany(() => Goal, (goal) => goal.animals)
    goals!: Goal[];

    @OneToMany(() => FormAnimalSubmission, (submission) => submission.animal, { cascade: true })
    submissions!: FormAnimalSubmission[];

    @OneToMany(() => AnimalHandler, (handler) => handler.animal, { cascade: true })
    animalsHandlers!: AnimalHandler[];
}
