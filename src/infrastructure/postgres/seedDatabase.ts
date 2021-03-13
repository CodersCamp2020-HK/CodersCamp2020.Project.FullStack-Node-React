import { getConnection } from 'typeorm';
// import Specie from './Specie';
// import { species } from './dummyData/species';
// import { seedLocalizations } from './dummyData/localizations';
// import Localization from './Localization';
//import User from './User';
//import { seedUsers } from './dummyData/users';
// import { seedAnimals } from './dummyData/animals';
// import Animal from './Animal';
import AnimalAdditionalInfo from './AnimalAdditionalInfo';
import { seedAnimalAdditionalInfo } from './dummyData/animalAdditionalInfo';

export default async function seedDatabase(): Promise<void> {
    await getConnection().getRepository(AnimalAdditionalInfo).save(seedAnimalAdditionalInfo(5));
    // await getConnection().getRepository(Specie).save(species);
    // await getConnection().getRepository(Localization).save(seedLocalizations(5));
    //await getConnection()
    //    .getRepository(User)
    //    .save(await seedUsers(5));
    //await getConnection().getRepository(Localization).save(seedLocalizations(5));
    // await getConnection().getRepository(Animal).save(seedAnimals(5));
}
