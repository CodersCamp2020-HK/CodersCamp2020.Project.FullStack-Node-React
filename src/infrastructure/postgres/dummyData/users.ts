import User from '../User';
import { DeepPartial } from 'typeorm';
import * as faker from 'faker';
import bcrypt from 'bcrypt';

export const seedUsers = async (amount: number): Promise<DeepPartial<User>[]> => {
    const users: DeepPartial<User>[] = [];
    const password = await bcrypt.hash('ZAQ!2wsx', 10);
    users.push({
        name: faker.name.firstName(),
        surname: faker.name.lastName(),
        phone: faker.random.number({
            min: 100000000,
            max: 999999999,
            precision: 1,
        }),
        mail: 'admin@admin.com',
        password: password,
        activated: true,
        birthDate: faker.date.past(
            faker.random.number({
                min: 18,
                max: 90,
                precision: 1,
            }),
        ),
        localization: { id: 1 },
    });
    users.push({
        name: faker.name.firstName(),
        surname: faker.name.lastName(),
        phone: faker.random.number({
            min: 100000000,
            max: 999999999,
            precision: 1,
        }),
        mail: 'user@user.com',
        password: password,
        activated: true,
        birthDate: faker.date.past(
            faker.random.number({
                min: 18,
                max: 90,
                precision: 1,
            }),
        ),
        localization: { id: 2 },
    });
    for (let i = 2; i < amount; i++) {
        users.push({
            name: faker.name.firstName(),
            surname: faker.name.lastName(),
            phone: faker.random.number({
                min: 100000000,
                max: 999999999,
                precision: 1,
            }),
            mail: faker.internet.email(),
            password: password,
            activated: true,
            birthDate: faker.date.past(
                faker.random.number({
                    min: 18,
                    max: 90,
                    precision: 1,
                }),
            ),
            localization: { id: i + 1 },
        });
    }
    return users;
};
