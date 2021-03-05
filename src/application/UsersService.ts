import { User } from '@infrastructure/postgres/User';
import ApiError from '@infrastructure/ApiError';
import { Repository } from 'typeorm';

export type UserCreationParams = Pick<User, 'email' | 'name' | 'phoneNumbers'>;
export type UserUpdateParams = Partial<UserCreationParams>;
export class UsersService {
    constructor(private userRepository: Repository<User>) {}

    public update(id: number, { ...userParams }: UserUpdateParams): Promise<User> {
        const user = await this.userRepository.findOne(id);
        if (!user) throw new ApiError('Not Found', 404, `User with id: ${id} not found!`);
    }
}
