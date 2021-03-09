import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne } from 'typeorm';
import { Animal } from './Animal';

@Entity()
export class AnimalPhoto {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column('bytea')
    buffer!: Buffer;

    @ManyToOne(() => Animal, (animal: Animal) => animal.photos)
    animal!: Animal;
}

@Entity()
export class AnimalThumbnailPhoto {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column('bytea')
    buffer!: Buffer;

    @OneToOne(() => Animal, (animal: Animal) => animal.thumbnail)
    animal!: Animal;
}
