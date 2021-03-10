import { Column, Entity, Index, ManyToOne, OneToMany } from 'typeorm';
import AnimalHandler from './AnimalHandler';
import FormVolunteerSubmission from './FormVolunteerSubmission';
import Organization from './Organization';
import { User, UserType } from './User';

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

    @OneToMany(() => AnimalHandler, (handler) => handler.organizationUser)
    caregivers!: AnimalHandler[];

    @OneToMany(() => FormVolunteerSubmission, (submission) => submission.reviewer)
    volunteerReviews!: FormVolunteerSubmission;
}
