import { User } from '@infrastructure/postgres/User';
import { Repository } from 'typeorm';

export class UsersService {
    constructor(private userRepository: Repository<User>) {}

    public async get(id: number): Promise<User> {
        const user = await this.userRepository.findOne(id);
        if (!user) throw new Error('User not found in database');
        return user;
    }

    public async activateUser(userId: number): Promise<void> {
        await this.userRepository
            .createQueryBuilder()
            .update(User)
            .set({
                activated: true,
            })
            .where('id = :id', { id: userId })
            .execute();
        return;
    }
}
