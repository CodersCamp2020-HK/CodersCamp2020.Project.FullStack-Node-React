import ApiError from '@infrastructure/ApiError';
import { Email, Password, User, UserType } from '@infrastructure/postgres/User';
import { PasswordRequirementsError, UniqueUserEmailError } from './UsersErrors';
import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { IAuthUserInfoRequest, IUserInfo } from '@infrastructure/Auth';

const SALT_ROUNDS = 10;

export type UserCreationParams = {
    mail: Email;
    password: Password;
    repPassword: Password;
};

export type UserLoginParams = Pick<User, 'mail' | 'password'>;

export interface ApiKey {
    apiKey: string;
}
export type UserResetPasswordParams = {
    password: Password;
};

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

    public async create(userCreationParams: UserCreationParams): Promise<void> {
        const potentialExistingUser = await this.userRepository.findOne({ where: { mail: userCreationParams.mail } });
        if (!potentialExistingUser) {
            if (userCreationParams.password != userCreationParams.repPassword) {
                throw new PasswordRequirementsError('Passwords do not match');
            }

            const hash = await bcrypt.hash(userCreationParams.password, SALT_ROUNDS);

            const user = this.userRepository.create({
                mail: userCreationParams.mail,
                password: hash,
            });

            this.userRepository.save(user);
        } else {
            throw new UniqueUserEmailError(userCreationParams.mail);
        }
        return;
    }

    public async updatePassword(
        id: number,
        { password }: UserResetPasswordParams,
        currentUser: IUserInfo,
    ): Promise<void> {
        const user = await this.userRepository.findOne(id);
        if (!user) throw new ApiError('Not Found', 404, `User with id: ${id} doesn't exist!`);

        if (currentUser.id !== id)
            throw new ApiError('Bad Request', 400, `You can not change password for user with id: ${id}`);
        const hash = await bcrypt.hash(password, SALT_ROUNDS);
        user.password = hash;
        this.userRepository.save(user);
    }

    public async login(userLoginParams: UserLoginParams): Promise<ApiKey> {
        const user = await this.userRepository.findOne({ where: { mail: userLoginParams.mail } });
        if (!user) throw new ApiError('Bad Request', 400, `Wrong email or password!`);

        const match = await bcrypt.compare(userLoginParams.password, user.password);
        console.log(await bcrypt.hash(userLoginParams.password, 10));
        if (!match) throw new ApiError('Bad Request', 400, `Wrong email or password!`);

        if (!process.env.JWT_KEY) throw new ApiError('Internal server error', 500, 'JWT private key not found!');
        const token = jwt.sign({ role: user.type, id: user.id }, process.env.JWT_KEY);

        return { apiKey: token };
    }

    public async delete(userId: number, request: IAuthUserInfoRequest): Promise<void> {
        const user = await this.userRepository.findOne(userId);
        if (!user) {
            throw new ApiError('Not found', 404, 'User does not exist');
        }

        const currentUser = request.user as IUserInfo;
        console.log(currentUser);

        if (currentUser.role == UserType.ADMIN || currentUser.id == userId) {
            await this.userRepository
                .createQueryBuilder()
                .delete()
                .from(User)
                .where('id = :id', { id: userId })
                .execute();
            return;
        }

        throw new ApiError('Unauthorized', 401, 'Only admin can delete other accounts');
    }
}
