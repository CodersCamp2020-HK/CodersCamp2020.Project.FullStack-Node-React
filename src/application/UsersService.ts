import ApiError from '@infrastructure/ApiError';
import { User } from '@infrastructure/postgres/User';
import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';

export type UserLoginParams = Pick<User, 'mail' | 'password'>;

export class UsersService {
    constructor(private userRepository: Repository<User>) {}

    public async login(userLoginParams: UserLoginParams): Promise<string> {
        const user = await this.userRepository.findOne({ where: { mail: userLoginParams.mail } });
        if (!user) throw new ApiError('Bad Request', 400, `Wrong email and password!`);

        const match = await bcrypt.compare(userLoginParams.password, user.password);
        if (match) return 'JWT będzie tu';

        return 'Niedobrze';
    }
}
