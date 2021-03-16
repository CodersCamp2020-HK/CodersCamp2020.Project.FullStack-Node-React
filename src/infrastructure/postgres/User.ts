import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import GoalDonation from './GoalDonation';
import OrganizationDonation from './OrganizationDonation';
import AnimalDonation from './AnimalDonation';
import Localization from './Localization';
import FormAnimalSubmission from './FormAnimalSubmission';
import OrganizationUser from './OrganizationUser';
import VolunteerHireStep from './VolunteerHireStep';
// import FormVolunteerSubmission from './FormVolunteerSubmission';
import Calendar from './Calendar';

/**
 * User Type
 * User can be: admin managing site, employee working in animal shelter, normal user wanting to adopt animal or volunteer helping sheler.
 */

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

@Entity('Users')
export default class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        length: 50,
        nullable: true,
        default: null,
    })
    name?: string;

    @Column({
        length: 50,
        nullable: true,
        default: null,
    })
    surname?: string;

    @Column({
        nullable: true,
        default: null,
    })
    phone?: number;

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

    @OneToMany(() => AnimalDonation, (animalDonation) => animalDonation.users, { cascade: true })
    animalDonations!: AnimalDonation[];

    @OneToMany(() => OrganizationDonation, (organizationDonation) => organizationDonation.user, { cascade: true })
    organizationDonations!: OrganizationDonation[];

    @OneToMany(() => GoalDonation, (goalDonation) => goalDonation.user, { cascade: true })
    goalDonations!: GoalDonation[];

    @ManyToOne(() => Localization, (localization) => localization.users)
    localization!: Localization;

    @OneToMany(() => FormAnimalSubmission, (submission) => submission.applicant, { nullable: true })
    animalSubmissions!: FormAnimalSubmission[];

    @OneToMany(() => OrganizationUser, (organizationUser) => organizationUser.user, { cascade: true, nullable: true })
    organizationUsers!: OrganizationUser[];

    @OneToMany(() => VolunteerHireStep, (step) => step.user, { cascade: true })
    steps!: VolunteerHireStep[];

    // @OneToMany(() => FormVolunteerSubmission, (submission) => submission.user, { cascade: true })
    // volunteerSubmission!: FormVolunteerSubmission[];

    @OneToMany(() => Calendar, (calendar) => calendar.user)
    meetings!: Calendar[];
}
