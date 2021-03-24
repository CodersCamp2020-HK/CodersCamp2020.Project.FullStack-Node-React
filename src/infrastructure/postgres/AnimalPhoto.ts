import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne } from 'typeorm';
import Animal from './Animal';

@Entity('AnimalPhoto')
export class AnimalPhoto {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column('bytea')
    buffer!: Buffer;

    @ManyToOne(() => Animal, (animal: Animal) => animal.photos, { onDelete: 'CASCADE' })
    animal!: Animal;
}

@Entity('AnimalThumbnailPhoto')
export class AnimalThumbnailPhoto {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column('bytea')
    buffer!: Buffer;

    @OneToOne(() => Animal, (animal: Animal) => animal.thumbnail, { onDelete: 'CASCADE' })
    animal!: Animal;
}
