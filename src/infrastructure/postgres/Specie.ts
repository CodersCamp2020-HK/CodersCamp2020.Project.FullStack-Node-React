import { Column, PrimaryGeneratedColumn, Entity, OneToMany } from 'typeorm';
import AdoptionStep from './AdoptionStep';

@Entity()
export default class Specie {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    species!: string;

    @OneToMany(() => AdoptionStep, (step) => step.specie)
    step!: AdoptionStep;
}
