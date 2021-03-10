import { Column, Entity, Index, ManyToOne, OneToMany } from 'typeorm';
import Organization from './Organization';
import FormAnimalSubmission from './FormAnimalSubmission';
import Questionnaire from './Form';
import Specie from './Specie';

@Entity('AdoptionSteps')
@Index(['organization', 'specie', 'number'], { unique: true })
export default class AdoptionStep {
    @Column()
    name!: string;

    @Column()
    description!: string;

    @ManyToOne(() => Organization, (organization) => organization.adoptionSteps, { primary: true, nullable: false })
    organization!: Organization;

    @ManyToOne(() => Specie, (specie) => specie.steps, { primary: true, nullable: false })
    specie!: Specie;

    @Column({ primary: true, nullable: false })
    number!: number;

    @ManyToOne(() => Questionnaire, (survey) => survey.steps)
    form!: Questionnaire;

    @OneToMany(() => FormAnimalSubmission, (submission) => submission.adoptionStep)
    submissions!: FormAnimalSubmission[];
}
