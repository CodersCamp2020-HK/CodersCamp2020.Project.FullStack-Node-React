import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AnimalPhotos {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column('bytea', { array: true, default: {} })
    bufferArray!: Buffer[];
}

@Entity()
export class AnimalThumbnailPhoto {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column('bytea')
    buffer!: Buffer;
}
