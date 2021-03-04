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

@Entity()
export class AnimalAdditionalInfo {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        type: 'enum',
        enum: AnimalActiveLevel,
        default: AnimalActiveLevel.UNKNOWN,
    })
    active_level!: AnimalActiveLevel;

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
    special_diet!: string;

    @Column({
        type: 'text',
        nullable: true,
    })
    comments!: string;

    @Column()
    temporary_home!: boolean;

    @Column()
    need_donations!: boolean;

    @Column()
    virtual_adoption!: boolean;

    @Column({
        type: 'date',
    })
    adoption_date!: Date;

    @Column({
        type: 'date',
    })
    admission_to_shelter!: Date;

    @Column()
    accepts_kids!: boolean;

    @Column()
    accepts_other_animals!: boolean;
}
