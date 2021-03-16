import Organization from '../Organization';
import { DeepPartial } from 'typeorm';
import * as faker from 'faker';

export const organizations: DeepPartial<Organization>[] = [
    {
        name: 'Braterska Łapa',
        krsNumber: 1234567890,
        description: faker.lorem.words(5),
        localization: { id: 1 },
    },
];
