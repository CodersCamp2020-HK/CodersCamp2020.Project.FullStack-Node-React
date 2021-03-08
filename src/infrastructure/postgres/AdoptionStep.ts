import { Column, Entity, Index, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
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

    @ManyToOne(() => Organization, (organization) => organization.step, { primary: true, nullable: false })
    organization!: Organization;

    @ManyToOne(() => Specie, (specie) => specie.id, { primary: true, nullable: false })
    specie!: Specie;

    @PrimaryColumn({ nullable: false })
    number!: number;

    @ManyToOne(() => Questionnaire, (survey) => survey.step)
    form!: Questionnaire;

    @OneToMany(() => QuestionnaireSubmission, (submission) => submission.adoptionStep)
    submission!: QuestionnaireSubmission;
}
