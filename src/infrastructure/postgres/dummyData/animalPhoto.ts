import { DeepPartial } from 'typeorm';
import { AnimalThumbnailPhoto, AnimalPhoto } from '../AnimalPhoto';
import * as fs from 'fs';
import * as path from 'path';

export const seedAnimalThumbnailPhoto = (amount: number): DeepPartial<AnimalThumbnailPhoto>[] => {
    const animalThumbnailPhoto: DeepPartial<AnimalThumbnailPhoto>[] = [];
    for (let i = 0; i < amount; i++) {
        const buffer = fs.readFileSync(path.join(__dirname, './dog.png'));
        animalThumbnailPhoto.push({
            buffer: buffer,
        });
    }
    return animalThumbnailPhoto;
};

export const seedAnimalPhoto = (amount: number): DeepPartial<AnimalPhoto>[] => {
    const animalPhoto: DeepPartial<AnimalPhoto>[] = [];
    for (let i = 0; i < amount; i++) {
        const buf = Buffer.from('hello world', 'utf8');

        animalPhoto.push({
            buffer: buf,
            animal: { id: 1 },
        });
    }
    return animalPhoto;
};
