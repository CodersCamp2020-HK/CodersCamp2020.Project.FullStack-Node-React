import { User } from '@infrastructure/postgres/User';
import { Repository } from 'typeorm';

export type UserLoginParams = Pick<User, 'mail' | 'password'>;

export class UsersService {
    constructor(private userRepository: Repository<User>) {}

    public async login(userLoginParams: UserLoginParams): Promise<string> {
        const userEmail = await this.userRepository.findOne({ where: userLoginParams.mail });

        return 'JWT będzie tu';
    }
}
