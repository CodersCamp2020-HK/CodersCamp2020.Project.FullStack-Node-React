import User from '../User';
import { DeepPartial } from 'typeorm';
import * as faker from 'faker';
import bcrypt from 'bcrypt';

export const seedUsers = async (amount: number): Promise<DeepPartial<User>[]> => {
    const users: DeepPartial<User>[] = [];
    const password = await bcrypt.hash('ZAQ!2wsx', 10);
    for (let i = 0; i < amount; i++) {
        users.push({
            name: faker.name.firstName(),
            surname: faker.name.lastName(),
            phone: faker.random.number(999999999),
            mail: faker.internet.email(),
            password: password,
            activated: faker.random.boolean(),
            localization: { id: i + 1 },
        });
    }
    return users;
};
