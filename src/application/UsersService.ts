import { User } from '@infrastructure/postgres/User';
import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

export type UserCreationParams = {
    mail: string;
    password: string;
    repPassword: string;
};

export class InvalidEmailFormatError extends Error {
    constructor() {
        super(`Invalid e-mail format`);
    }
}

export class UniqueUserEmailError extends Error {
    constructor(email: string) {
        super(`User with (email:  ${email}) already exists`);
    }
}

export class PasswordRequirementsError extends Error {
    constructor(reason: string) {
        super(reason);
    }
}

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
            throw new InvalidEmailFormatError();
        }

        const potentialExistingUser = await this.userRepository.findOne({ where: { mail: userCreationParams.mail } });
        if (!potentialExistingUser) {
            //Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:
            const passwordRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

            if (!passwordRegExp.test(userCreationParams.password)) {
                throw new PasswordRequirementsError('Failed password requirements');
            }

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
}
