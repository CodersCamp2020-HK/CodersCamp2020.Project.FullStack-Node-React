import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
}
