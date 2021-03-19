import { Column, Entity, Index, ManyToOne, OneToMany } from 'typeorm';
import Organization from './Organization';
import FormAnimalSubmission from './FormAnimalSubmission';
import Form from './Form';
import Specie from './Specie';
import { Length, Min, Max } from 'class-validator';

@Entity('AdoptionSteps')
@Index(['organization', 'specie', 'number'], { unique: true })
export default class AdoptionStep {
    @Column()
    @Length(3, 100)
    name!: string;

    @Column()
    @Length(3, 300)
    description!: string;

    @ManyToOne(() => Organization, (organization) => organization.adoptionSteps, { primary: true, nullable: false })
    organization!: Organization;

    @ManyToOne(() => Specie, (specie) => specie.steps, { primary: true, nullable: false })
    specie!: Specie;

    @Min(1)
    @Max(10000)
    @Column({ primary: true, nullable: false })
    number!: number;

    @ManyToOne(() => Form, (survey) => survey.adoptionSteps)
    form!: Form;

    @OneToMany(() => FormAnimalSubmission, (submission) => submission.adoptionStep, { cascade: true })
    submissions!: FormAnimalSubmission[];
}
