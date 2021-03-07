import { Column, Entity, Index, ManyToOne, PrimaryColumn } from 'typeorm';
import { Organization } from './Organization';
import { Questionnaire } from './Questionnaire';
import Specie from './Specie';

@Entity()
@Index(['organization', 'specie', 'number'], { unique: true })
export default class AdoptionStep {
    @PrimaryColumn()
    @ManyToOne(() => Organization, (organization) => organization.step)
    organization!: Organization;

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
