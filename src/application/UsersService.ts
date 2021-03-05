import { User } from '@infrastructure/postgres/User';
import ApiError from '@infrastructure/ApiError';
import { Repository } from 'typeorm';

export type UserUpdateParams = Pick<User, 'name' | 'phone' | 'surname'>;
export class UsersService {
    constructor(private userRepository: Repository<User>) {}

    public async update(id: number, userUpdateParams: UserUpdateParams): Promise<User> {
        const user = await this.userRepository.findOne(id);
        if (!user) throw new ApiError('Not Found', 404, `User with id: ${id} not found!`);
        const updateUser = { ...user, ...userUpdateParams };

        return this.userRepository.save(updateUser);
    }
}
