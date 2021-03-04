import ApiError from '@infrastructure/ApiError';
import { User } from '@infrastructure/postgres/User';
import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

export class UsersService {
    constructor(private userRepostiory: Repository<User>) {}

    public async updatePassword(id: number, newPassword: string): Promise<void> {
        const user = await this.userRepostiory.findOne(id);
        if (!user) throw new ApiError('Not Found', 404, `User with id: ${id} doesn't exist!`);

        // Minimum eight characters, at least one upper case English letter, one lower case English letter and one number
        const re = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/gm;
        if (!re.test(newPassword))
            throw new ApiError('Bad Request', 400, `Password does not meet length and complexity requirements!`);
        const hash = await bcrypt.hash(newPassword, SALT_ROUNDS);
        user.password = hash;
        this.userRepostiory.save(user);
    }
}
