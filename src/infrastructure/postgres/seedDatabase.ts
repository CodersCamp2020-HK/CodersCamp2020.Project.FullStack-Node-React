import { getConnection } from 'typeorm';
import Specie from './Specie';
import { species } from './dummyData/species';

export default async function seedDatabase(): Promise<void> {
    await getConnection().getRepository(Specie).save(species);
}
