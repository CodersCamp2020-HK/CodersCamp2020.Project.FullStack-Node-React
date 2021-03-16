import User from '@infrastructure/postgres/User';
import { DeepPartial } from 'typeorm';
export const singleUserExample: DeepPartial<User> = {
    id: 1,
    name: 'Jan',
    surname: 'Nowak',
    phone: 123456789,
    mail: 'email@domain.com',
    registrationDate: new Date(),
    activated: true,
};
