import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany, ManyToOne } from 'typeorm';
import AnimalAdditionalInfo from './AnimalAdditionalInfo';
import { AnimalPhoto, AnimalThumbnailPhoto } from './AnimalPhoto';
import Goal from './Goal';
import AnimalDonation from './AnimalDonation';
import FormAnimalSubmission from './FormAnimalSubmission';
import AnimalHandler from './AnimalHandler';
import Specie from './Specie';
import Calendar from './Calendar';
import { Length, Min, Max, IsBoolean } from 'class-validator';

@Entity('Animals')
export default class Animal {
    @PrimaryGeneratedColumn()
    id!: number;

    /**
     * The name of the animal used to register its in database.
     */

    @Column()
    @Length(3, 100)
    name!: string;

    /**
     * The age of the animal used to register its in database.
     */
    @Min(0)
    @Max(50)
    @Column()
    age!: number;

    /**
     * The animal's spieces (cat/dog) used to register its in database.
     */
    @ManyToOne(() => Specie, (specie) => specie.animals, { cascade: true })
    specie!: Specie;

    /**
     * The description of the animal.
     * Extra information deliverd by user
     */
    @Length(0, 300)
    @Column()
    description!: string;

    /**
     * The animal is ready for adoption
     */
    @IsBoolean()
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

    @OneToMany(() => Calendar, (calendar) => calendar.animal)
    meetings!: Calendar[];
}
