import Specie from '../Specie';
import { DeepPartial } from 'typeorm';

export const species: DeepPartial<Specie>[] = [
    {
        specie: 'dog',
    },
    {
        specie: 'cat',
    },
];
