import { DeepPartial } from 'typeorm';
import { AnimalThumbnailPhoto, AnimalPhoto } from '../AnimalPhoto';
import * as fs from 'fs';
import * as path from 'path';

export const seedAnimalThumbnailPhoto = (amount: number): DeepPartial<AnimalThumbnailPhoto>[] => {
    const animalThumbnailPhoto: DeepPartial<AnimalThumbnailPhoto>[] = [];
    for (let i = 0; i < amount / 2; i++) {
        const buffer = fs.readFileSync(path.join(__dirname, `./dog${i + 1}.png`));
        animalThumbnailPhoto.push({
            buffer: buffer,
            animal: { id: i + 1 },
        });
    }
    for (let i = 0; i < amount / 2; i++) {
        const buffer = fs.readFileSync(path.join(__dirname, `./cat${i + 1}.png`));
        animalThumbnailPhoto.push({
            buffer: buffer,
            animal: { id: amount / 2 + i },
        });
    }
    return animalThumbnailPhoto;
};

export const seedAnimalPhoto = (amount: number): DeepPartial<AnimalPhoto>[] => {
    const animalPhoto: DeepPartial<AnimalPhoto>[] = [];
    for (let i = 0; i < amount / 2; i++) {
        const buffer = fs.readFileSync(path.join(__dirname, `./dogg${i + 1}.png`));

        animalPhoto.push({
            buffer: buffer,
            animal: { id: i + 1 },
        });
    }

    for (let i = 0; i < amount / 2; i++) {
        const buffer = fs.readFileSync(path.join(__dirname, `./catt${i + 1}.png`));

        animalPhoto.push({
            buffer: buffer,
            animal: { id: amount / 2 + i },
        });
    }

    return animalPhoto;
};
