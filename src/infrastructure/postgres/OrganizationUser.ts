import { Column, Entity, Index, ManyToOne } from 'typeorm';
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
}
