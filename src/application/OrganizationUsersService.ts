import OrganizationUser from '@infrastructure/postgres/OrganizationUser';
import { Repository } from 'typeorm';

export class OrganizationUsersService {
    constructor(private organizationUsersRepository: Repository<OrganizationUser>) {}

    public async getAllUsers(role?: string): Promise<OrganizationUser[]> {
        const organizationUsersQuery = this.organizationUsersRepository
            .createQueryBuilder('organization-user')
            .leftJoin('organization-user.user', 'user')
            .leftJoin('organization-user.organization', 'organization')
            .select([
                'organization-user',
                'organization.id',
                'organization.name',
                'user.id',
                'user.name',
                'user.surname',
            ]);

        if (role) {
            organizationUsersQuery.andWhere('role = :role', { role });
        }

        return await organizationUsersQuery.getMany();
    }
}
