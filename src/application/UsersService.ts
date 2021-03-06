import ApiError from '@infrastructure/ApiError';
import { Password, User } from '@infrastructure/postgres/User';
import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';
import { IUserInfo } from '@infrastructure/Auth';

export type UserResetPasswordParams = {
    password: Password;
};

const SALT_ROUNDS = 10;

export class UsersService {
    constructor(private userRepostiory: Repository<User>) {}

    public async updatePassword(
        id: number,
        { password }: UserResetPasswordParams,
        currentUser: IUserInfo,
    ): Promise<void> {
        const user = await this.userRepostiory.findOne(id);
        if (!user) throw new ApiError('Not Found', 404, `User with id: ${id} doesn't exist!`);

        if (currentUser.id !== id)
            throw new ApiError('Bad Request', 400, `You can not change password for user with id: ${id}`);
        const hash = await bcrypt.hash(password, SALT_ROUNDS);
        user.password = hash;
        this.userRepostiory.save(user);
    }
}
