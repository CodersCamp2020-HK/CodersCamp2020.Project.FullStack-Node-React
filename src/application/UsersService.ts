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
        const emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!emailRegExp.test(userCreationParams.mail)) {
            throw new Error('Invalid e-mail format');
        }

        const potentialExistingUser = await this.userRepository.findOne({ where: { mail: userCreationParams.mail } });
        if (!potentialExistingUser) {

            //Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:
            const passwordRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

            if (!passwordRegExp.test(userCreationParams.password)) {
                throw new Error('Failed password requirements');
            }

            if (userCreationParams.password != userCreationParams.repPassword) {
                throw new Error('Passwords do not match');
            }

            const currentRep = this.userRepository;

            bcrypt.hash(userCreationParams.password, SALT_ROUNDS, function (err: Error, hash: string) {
                if (err) {
                    throw err;
                }
                const user = currentRep.create({
                    mail: userCreationParams.mail,
                    password: hash,
                });

                currentRep.save(user);
            });
        } else {
            throw new Error('User with this email exists');
        }

        return;
    }
}
