import { getConnection } from 'typeorm';
//import Specie from './Specie';
//import { species } from './dummyData/species';
import { seedLocalizations } from './dummyData/localizations';
import Localization from './Localization';

export default async function seedDatabase(): Promise<void> {
    //await getConnection().getRepository(Specie).save(species);
    await getConnection().getRepository(Localization).save(seedLocalizations(5));
}
