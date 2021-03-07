import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AnimalDonation {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        length: 50,
    })
    name!: string;
}
