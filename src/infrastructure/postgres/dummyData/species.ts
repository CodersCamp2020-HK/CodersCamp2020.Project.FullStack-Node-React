import Specie from '../Specie';
import { DeepPartial } from 'typeorm';

export const species: DeepPartial<Specie>[] = [
    {
        id: 1,
        specie: 'dog',
    },
    {
        id: 2,
        specie: 'cat',
    },
];
