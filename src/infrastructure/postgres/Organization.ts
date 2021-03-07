import { Goal, OrganizationDonation } from './Donation';
import { Localization } from './Localization';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import AdoptionStep from './AdoptionStep';
import QuestionnaireSubmission from './QuestionaireSubmission';

@Entity()
export class Organization {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        length: 50,
        nullable: true,
        default: null,
    })
    name!: string;

    /**
     * The short description of the organization.
     */
    @Column({
        type: 'text',
    })
    description!: string;

    /**
     * The unique KRS number of organization .
     */
    @Column()
    krsNumber!: number;

    @ManyToOne(() => OrganizationDonation, (organizationDonation) => organizationDonation.organization, {
        cascade: true,
    })
    organizatonDonation!: OrganizationDonation;

    @ManyToOne(() => Goal, (goal) => goal.organization)
    goal!: Goal;

    @ManyToOne(() => Localization, (localization) => localization.organization)
    localization!: Localization;
    @OneToMany(() => AdoptionStep, (step) => step.organization)
    step!: AdoptionStep;

    @OneToMany(() => QuestionnaireSubmission, (submission) => submission.organization)
    submission!: QuestionnaireSubmission;
}
