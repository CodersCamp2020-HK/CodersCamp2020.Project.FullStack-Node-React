import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AnimalPhotos {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column('text', { array: true, default: {} })
    base64array!: string[];
}

@Entity()
export class AnimalThumbnailPhoto {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    base64!: string;
}
