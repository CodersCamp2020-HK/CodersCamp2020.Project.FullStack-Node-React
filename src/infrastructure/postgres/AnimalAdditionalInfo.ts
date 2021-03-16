import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum AnimalActiveLevel {
    LOW = 'low',
    MEDIUM = 'medium',
    HIGH = 'high',
    UNKNOWN = 'unknown',
}

export enum AnimalSize {
    SMALL = 'small',
    MEDIUM = 'medium',
    HIGH = 'large',
    UNKNOWN = 'unknown',
}

@Entity('AnimalsAdditionalInfo')
export default class AnimalAdditionalInfo {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        type: 'enum',
        enum: AnimalActiveLevel,
        default: AnimalActiveLevel.UNKNOWN,
    })
    activeLevel!: AnimalActiveLevel;

    @Column({
        type: 'enum',
        enum: AnimalSize,
        default: AnimalSize.UNKNOWN,
    })
    size!: AnimalSize;

    @Column({
        type: 'text',
        nullable: true,
    })
    specialDiet?: string;

    @Column({
        type: 'text',
        nullable: true,
    })
    comments?: string;

    @Column()
    temporaryHome!: boolean;

    @Column()
    needDonations!: boolean;

    @Column()
    virtualAdoption!: boolean;

    @Column({
        type: 'date',
        default: new Date(),
    })
    adoptionDate!: Date;

    @Column({
        type: 'date',
        default: new Date(),
    })
    admissionToShelter!: Date;

    @Column()
    acceptsKids!: boolean;

    @Column()
    acceptsOtherAnimals!: boolean;
}
