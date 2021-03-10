import { Column, PrimaryGeneratedColumn, Entity, OneToMany } from 'typeorm';
import AdoptionStep from './AdoptionStep';

@Entity('Species')
export default class Specie {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    specie!: string;

    @OneToMany(() => AdoptionStep, (step) => step.specie, { cascade: true })
    steps!: AdoptionStep[];
}
