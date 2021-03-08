import { Entity, Column, PrimaryGeneratedColumn, Generated, CreateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import GoalDonation from './Donation';
import OrganizationDonation from './OrganizationDonation';
import AnimalDonation from './AnimalDonation';
import Localization from './Localization';
import QuestionnaireSubmission from './QuestionaireSubmission';

/**
 * User Type
 * User can be: admin managing site, employee working in animal shelter, normal user wanting to adopt animal or volunteer helping sheler.
 */
export enum UserType {
    ADMIN = 'admin',
    EMPLOYEE = 'employee',
    NORMAL = 'normal',
    VOLUNTEER = 'volunteer',
}

/**
 * User E-mail.
 * E-mail is used to registration and login
 * @pattern `^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$`
 */
export type Email = string;

/**
 * User Password.
 * Password is used to registration and login.
 * Passowrd requirements: minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character
 * @pattern `^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$`
 */
export type Password = string;

/**
 * Stringified UUIDv4.
 * See [RFC 4112](https://tools.ietf.org/html/rfc4122)
 * @pattern [0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}
 */
export type UUID = string;

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        length: 50,
        nullable: true,
        default: null,
    })
    name!: string;

    @Column({
        length: 50,
        nullable: true,
        default: null,
    })
    surname!: string;

    @Column({
        type: 'enum',
        enum: UserType,
        default: UserType.NORMAL,
    })
    type!: UserType;

    @Column({
        nullable: true,
        default: null,
    })
    phone!: number;

    @Column({
        length: 50,
        unique: true,
    })
    mail!: Email;

    @Column({
        length: 255,
    })
    password!: Password;

    @CreateDateColumn()
    registrationDate!: Date;

    @Column({ default: false })
    activated!: boolean;

    @Column()
    @Generated('uuid')
    activationLinkUuid!: UUID;

    @ManyToOne(() => AnimalDonation, (animalDonation) => animalDonation.user, { cascade: true })
    animalDonation!: AnimalDonation;

    @ManyToOne(() => OrganizationDonation, (organizationDonation) => organizationDonation.user, { cascade: true })
    organizationDonation!: OrganizationDonation;

    @ManyToOne(() => GoalDonation, (goalDonation) => goalDonation.user, { cascade: true })
    goalDonation!: GoalDonation;

    @ManyToOne(() => Localization, (localization) => localization.user)
    localization!: Localization;

    @OneToMany(() => QuestionnaireSubmission, (submission) => submission.applicant)
    submission!: QuestionnaireSubmission;

    @Column({ nullable: true })
    @ManyToOne(() => QuestionnaireSubmission, (submission) => submission.reviewer)
    submissionReview!: QuestionnaireSubmission;
}
