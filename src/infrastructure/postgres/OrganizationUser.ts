import { Column, Entity, Index, ManyToOne, OneToMany } from 'typeorm';
import AnimalHandler from './AnimalHandler';
import FormAnimalSubmission from './FormAnimalSubmission';
import FormVolunteerSubmission from './FormVolunteerSubmission';
import Organization from './Organization';
import { User } from './User';

export enum UserType {
    ADMIN = 'admin',
    EMPLOYEE = 'employee',
    NORMAL = 'normal',
    VOLUNTEER = 'volunteer',
}

@Index(['user', 'organization'], { unique: true })
@Entity('OrganizationUsers')
export default class OrganizationUser {
    @ManyToOne(() => User, (user) => user.organizationUsers, { primary: true, nullable: false })
    user!: User;

    @ManyToOne(() => Organization, (organization) => organization.organizationUsers)
    organization!: Organization;

    @Column({
        type: 'enum',
        enum: UserType,
    })
    role!: UserType;

    @OneToMany(() => FormAnimalSubmission, (submission) => submission.reviewer, { nullable: true, cascade: true })
    animalReviews!: FormAnimalSubmission[];

    @OneToMany(() => AnimalHandler, (handler) => handler.organizationUser, { cascade: true })
    caregivers!: AnimalHandler[];

    @OneToMany(() => FormVolunteerSubmission, (submission) => submission.reviewer, { cascade: true })
    volunteerReviews!: FormVolunteerSubmission;
}
