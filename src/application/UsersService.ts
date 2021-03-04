import ApiError from '@infrastructure/ApiError';
import { Password, User } from '@infrastructure/postgres/User';
import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';
import { IAuthUserInfoRequest, IUserInfo } from '@infrastructure/Auth';

export type UserResetPasswordParams = {
    password: Password;
};

function isUserInfo(obj: string | IUserInfo): obj is IUserInfo {
    return (obj as IUserInfo).id !== undefined;
}

const SALT_ROUNDS = 10;

export class UsersService {
    constructor(private userRepostiory: Repository<User>) {}

    public async updatePassword(
        id: number,
        { password }: UserResetPasswordParams,
        request: IAuthUserInfoRequest,
    ): Promise<void> {
        const user = await this.userRepostiory.findOne(id);
        if (!user) throw new ApiError('Not Found', 404, `User with id: ${id} doesn't exist!`);

        const currentUser = request.body.user;
        console.log(currentUser);
        if (isUserInfo(currentUser)) {
            if (currentUser.id !== id) throw new ApiError('Bad Request', 400, `You can not delete user with id: ${id}`);
            const hash = await bcrypt.hash(password, SALT_ROUNDS);
            user.password = hash;
            this.userRepostiory.save(user);
        }
    }
}
