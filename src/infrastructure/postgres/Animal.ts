import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { AnimalAdditionalInfo } from './AnimalAdditionalInfo';
import { AnimalPhotos, AnimalThumbnailPhoto } from './AnimalPhoto';

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

    @OneToOne(() => AnimalThumbnailPhoto, { cascade: true })
    @JoinColumn()
    thumbnail!: AnimalThumbnailPhoto;

    @OneToOne(() => AnimalPhotos, { cascade: true })
    @JoinColumn()
    photos!: AnimalPhotos;
}
