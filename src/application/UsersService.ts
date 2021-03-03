import { User, UserType } from '@infrastructure/postgres/User';
import { Repository } from 'typeorm';
import { IAuthUserInfoRequest, IUserInfo } from '@infrastructure/Auth';
import ApiError from '@infrastructure/ApiError';

export class UsersService {
    constructor(private userRepository: Repository<User>) {}

    public async delete(userId: number, request: IAuthUserInfoRequest): Promise<void> {
        const user = await this.userRepository.findOne(userId);
        if (!user) {
            throw new ApiError('Not found', 404, 'User does not exist');
        }

        const currentUser = request.body.currentUser as IUserInfo;

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
