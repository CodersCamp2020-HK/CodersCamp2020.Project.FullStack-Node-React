import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Length, IsBoolean, IsDate } from 'class-validator';

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

    @Length(3, 100)
    @Column({
        type: 'text',
        nullable: true,
    })
    specialDiet?: string;

    @Length(3, 300)
    @Column({
        type: 'text',
        nullable: true,
    })
    comments?: string;

    @IsBoolean()
    @Column()
    temporaryHome!: boolean;

    @IsBoolean()
    @Column()
    needDonations!: boolean;

    @IsBoolean()
    @Column()
    virtualAdoption!: boolean;

    @IsDate()
    @Column({
        nullable: true,
        default: null,
    })
    adoptionDate!: Date;

    @IsDate()
    @Column({
        nullable: true,
        default: new Date(),
    })
    admissionToShelter!: Date;

    @IsBoolean()
    @Column()
    acceptsKids!: boolean;

    @IsBoolean()
    @Column()
    acceptsOtherAnimals!: boolean;
}
