import ApiError from '@infrastructure/ApiError';
import { User } from '@infrastructure/postgres/User';
import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export type UserLoginParams = Pick<User, 'mail' | 'password'>;

export class UsersService {
    constructor(private userRepository: Repository<User>) {}

    public async login(userLoginParams: UserLoginParams): Promise<string> {
        const user = await this.userRepository.findOne({ where: { mail: userLoginParams.mail } });
        if (!user) throw new ApiError('Bad Request', 400, `Wrong email or password!`);

        const match = await bcrypt.compare(userLoginParams.password, user.password);
        if (!match) throw new ApiError('Bad Request', 400, `Wrong email or password!`);

        if (!process.env.JWT_KEY) throw new ApiError('Internal server error', 500, 'JWT private key not found!');
        const token = jwt.sign(
            {
                role: user.type,
            },
            process.env.JWT_KEY,
        );

        return token;
    }
}
