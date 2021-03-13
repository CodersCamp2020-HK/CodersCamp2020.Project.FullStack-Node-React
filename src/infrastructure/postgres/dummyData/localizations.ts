import Localization from '../Localization';
import { DeepPartial } from 'typeorm';
import * as faker from 'faker';

export const seedLocalizations = (amount: number): DeepPartial<Localization>[] => {
    const localizations: DeepPartial<Localization>[] = [];
    for (let i = 0; i < amount; i++) {
        localizations.push({
            country: faker.address.country(),
            city: faker.address.city(),
            address: faker.address.streetAddress(),
        });
    }
    return localizations;
};
