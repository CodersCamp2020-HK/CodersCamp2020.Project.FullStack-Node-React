import OrganizationUser, { UserType } from '../OrganizationUser';
import { DeepPartial } from 'typeorm';

export const organizationUsers: DeepPartial<OrganizationUser>[] = [
    {
        role: UserType.ADMIN,
        organization: { id: 1 },
        user: { id: 1 },
    },
    {
        role: UserType.EMPLOYEE,
        organization: { id: 1 },
        user: { id: 2 },
    },
    {
        role: UserType.VOLUNTEER,
        organization: { id: 1 },
        user: { id: 3 },
    },
];
