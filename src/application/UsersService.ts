import ApiError from '@infrastructure/ApiError';
import { User } from '@infrastructure/postgres/User';
import { Repository } from 'typeorm';

export class UsersService {
    constructor(private userRepostiory: Repository<User>) {}

    public async delete(id: number) {
        const user = await this.userRepostiory.findOne(id);
        if (!user) throw new ApiError('Not Found', 404, `User with id: ${id} doesn't exist!`);
    }
}
