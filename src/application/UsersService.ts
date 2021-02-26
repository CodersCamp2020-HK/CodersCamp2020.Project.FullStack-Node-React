import { User } from '@infrastructure/postgres/User';
import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

export type UserCreationParams = {
    mail: string;
    password: string;
    repPassword: string;
};

export class UsersService {
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
                throw new Error('Passwords do not match');
            }

            const currentRep = this.userRepository;

            bcrypt.hash(userCreationParams.password, SALT_ROUNDS, function (err, hash) {
                if (err) {
                    throw err;
                }
                const user = currentRep.create({
                    mail: userCreationParams.mail,
                    password: hash,
                });

                currentRep.save(user);
            });
        }
        else {
            throw new Error('User with this email exists');
        }

        return;
    }
}
