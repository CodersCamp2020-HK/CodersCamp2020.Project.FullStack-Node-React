import { Column, Entity, Index, ManyToOne, OneToMany } from 'typeorm';
import Organization from './Organization';
import QuestionnaireSubmission from './QuestionaireSubmission';
import Questionnaire from './Questionnaire';
import Specie from './Specie';

@Entity()
@Index(['organization', 'specie', 'number'], { unique: true })
export default class AdoptionStep {
    @Column()
    name!: string;

    @Column()
    description!: string;

    @ManyToOne(() => Organization, (organization) => organization.step)
    organization!: Organization;

    @ManyToOne(() => Specie, (specie) => specie.id)
    specie!: Specie;

    @Column()
    number!: number;

    @ManyToOne(() => Questionnaire, (survey) => survey.step)
    form!: Questionnaire;

    @OneToMany(() => QuestionnaireSubmission, (submission) => submission.adoptionStep)
    submission!: QuestionnaireSubmission;
}
