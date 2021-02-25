import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { AnimalAdditionalInfo } from './AnimalAdditionalInfo';

export enum AnimalSpecies {
    CAT = 'cat',
    DOG = 'dog',
}

@Entity()
export class Animal {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        length: 50,
    })
    name!: string;

    @Column()
    age!: number;

    @Column({
        type: 'enum',
        enum: AnimalSpecies,
    })
    specie!: AnimalSpecies;

    @Column({
        type: 'text',
    })
    description!: string;

    @Column()
    ready_for_adoption!: boolean;

    @OneToOne(() => AnimalAdditionalInfo, { cascade: true })
    @JoinColumn()
    additional_info!: AnimalAdditionalInfo;
}