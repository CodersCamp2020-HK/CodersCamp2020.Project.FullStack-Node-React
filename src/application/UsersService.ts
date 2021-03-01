import { User } from '@infrastructure/postgres/User';
import { Repository } from 'typeorm';

export class UsersService {
    constructor(private userRepository: Repository<User>) {}

    public async delete(userId: number): Promise<void> {
        await this.userRepository.createQueryBuilder().delete().from(User).where('id = :id', { id: userId }).execute();
        return;
    }
}
