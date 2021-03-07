import { Column, Entity, Index, ManyToOne, PrimaryColumn } from 'typeorm';
import { Questionnaire } from './Questionnaire';
import Specie from './Specie';

@Entity()
@Index(['organization', 'specie', 'number'], { unique: true })
export default class AdoptionStep {
    @PrimaryColumn()
    organization!: number;

    @PrimaryColumn()
    @ManyToOne(() => Specie, (specie) => specie.id)
    specie!: Specie;

    @PrimaryColumn()
    @Column()
    number!: number;

    @ManyToOne(() => Questionnaire, (survey) => survey.step)
    form!: Questionnaire;

    @Column()
    name!: string;

    @Column()
    description!: string;
}
