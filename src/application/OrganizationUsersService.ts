import OrganizationUser from '@infrastructure/postgres/OrganizationUser';
import { Repository } from 'typeorm';

export class OrganizationUsersService {
    constructor(private organizationUsersRepository: Repository<OrganizationUser>) {}

    public async getAllUsers(role?: string): Promise<OrganizationUser[]> {}
}
