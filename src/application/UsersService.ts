import ApiError from '@infrastructure/ApiError';
import { Email, Password, User, UserType, UUID } from '@infrastructure/postgres/User';
import { PasswordRequirementsError, UniqueUserEmailError } from './UsersErrors';
import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { IAuthUserInfoRequest, IUserInfo } from '@infrastructure/Auth';
import { Inject } from 'typescript-ioc';
import { EmailService } from '@infrastructure/EmailService';

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

export interface EmailResetPassword {
    email: Email;
}

export interface ResetPasswordLink {
    link: UUID;
}

export type UserResetPasswordParams = {
    password: Password;
    repPassword: Password;
};

export type UserUpdateParams = Pick<User, 'name' | 'phone' | 'surname'>;

export class UsersService {
    @Inject
    emailService!: EmailService;

    constructor(private userRepository: Repository<User>) {}

    public async get(id: number): Promise<User> {
        const user = await this.userRepository.findOne(id);
        if (!user) throw new Error('User not found in database');
        return user;
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
        { password, repPassword: confirmPassword }: UserResetPasswordParams,
        currentUser: IUserInfo,
    ): Promise<void> {
        const user = await this.userRepository.findOne(id);

        if (!user) throw new ApiError('Not Found', 404, `User with id: ${id} doesn't exist!`);
        if (currentUser.id !== id)
            throw new ApiError('Bad Request', 400, `You can not change password for user with id: ${id}`);
        if (password !== confirmPassword) throw new ApiError('Bad Request', 400, `Passwords don't match.`);

        const hash = await bcrypt.hash(password, SALT_ROUNDS);
        user.password = hash;
        this.userRepository.save(user);
    }

    public async login(userLoginParams: UserLoginParams): Promise<ApiKey> {
        const user = await this.userRepository.findOne({ where: { mail: userLoginParams.mail } });
        if (!user) throw new ApiError('Bad Request', 400, `Wrong email or password!`);

        const match = await bcrypt.compare(userLoginParams.password, user.password);
        if (!match) throw new ApiError('Bad Request', 400, `Wrong email or password!`);

        if (!process.env.JWT_KEY) throw new ApiError('Internal server error', 500, 'JWT private key not found!');
        const token = jwt.sign({ role: user.type, id: user.id }, process.env.JWT_KEY);

        return { apiKey: token };
    }

    public async update(id: number, userUpdateParams: Partial<UserUpdateParams>): Promise<User> {
        const user = await this.userRepository.findOne(id);
        if (!user) throw new ApiError('Not Found', 404, `User with id: ${id} not found!`);
        const updateUser = { ...user, ...userUpdateParams };

        return this.userRepository.save(updateUser);
    }

    public async delete(userId: number, request: IAuthUserInfoRequest): Promise<void> {
        const user = await this.userRepository.findOne(userId);
        if (!user) {
            throw new ApiError('Not found', 404, 'User does not exist');
        }

        const currentUser = request.user as IUserInfo;

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

    public async sendResetPasswordLink({ email }: EmailResetPassword): Promise<void> {
        const user = await this.userRepository.findOne({ where: { mail: email } });

        if (!user) throw new ApiError('Not Found', 404, `Wrong email`);

        this.emailService.sendResetPasswordLink(email, user.resetPasswordLink);
    }

    public async resetPassword(userResetUUID: UUID, { password, repPassword }: UserResetPasswordParams): Promise<void> {
        const user = await this.userRepository.findOne({ where: { resetPasswordLink: userResetUUID } });

        if (!user) throw new ApiError('Not Found', 404, `User with uuid: ${userResetUUID} doesn't exist!`);
        if (password !== repPassword) throw new ApiError('Bad Request', 400, `Passwords don't match.`);

        const hash = await bcrypt.hash(password, SALT_ROUNDS);
        user.password = hash;
        this.userRepository.save(user);
    }
}
