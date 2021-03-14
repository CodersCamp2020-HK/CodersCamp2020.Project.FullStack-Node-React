import { getConnection } from 'typeorm';

// import { seedLocalizations } from './dummyData/localizations';
// import Localization from './Localization';
//import User from './User';
//import { seedUsers } from './dummyData/users';

import { seedAnimals } from './dummyData/animals';
import Animal from './Animal';

import Specie from './Specie';
import { species } from './dummyData/species';

import AnimalAdditionalInfo from './AnimalAdditionalInfo';
import { seedAnimalAdditionalInfo } from './dummyData/animalAdditionalInfo';

import { AnimalThumbnailPhoto } from './AnimalPhoto';
import { seedAnimalThumbnailPhoto } from './dummyData/animalPhoto';

const clear = false;
export default async function seedDatabase(): Promise<void> {
    if (clear) {
        await getConnection().synchronize(true); // czyści baze danych
    } else {
        // getConnection().synchronize(true);
        await getConnection().getRepository(AnimalAdditionalInfo).save(seedAnimalAdditionalInfo(5));
        await getConnection().getRepository(AnimalThumbnailPhoto).save(seedAnimalThumbnailPhoto(5));
        await getConnection().getRepository(Specie).save(species);
        await getConnection().getRepository(Animal).save(seedAnimals(5));
    }

    // await getConnection().getRepository(Localization).save(seedLocalizations(5));
    //await getConnection()
    //    .getRepository(User)
    //    .save(await seedUsers(5));
    //await getConnection().getRepository(Localization).save(seedLocalizations(5));
}
