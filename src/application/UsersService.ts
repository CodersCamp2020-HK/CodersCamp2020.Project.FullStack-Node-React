import { User } from '@infrastructure/postgres/User';
import { Repository } from 'typeorm';

export type UserCreationParams = {
    mail: string;
    password: string;
    repPassword: string;
};

export class UsersService {
    constructor(private userRepository: Repository<User>) {}

    public async get(id: number): Promise<User> {
        const user = await this.userRepository.findOne(id);
        if (!user) throw new Error('User not found in database');
        return user;
    }

    public async create(userCreationParams: UserCreationParams): Promise<void> {
        if (userCreationParams.password != userCreationParams.repPassword) {
            throw new Error('Passwords do not match');
        }
        return;
    }
}