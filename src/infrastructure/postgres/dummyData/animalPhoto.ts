import { DeepPartial } from 'typeorm';
import { AnimalThumbnailPhoto, AnimalPhoto } from '../AnimalPhoto';

export const seedAnimalThumbnailPhoto = (amount: number): DeepPartial<AnimalThumbnailPhoto>[] => {
    const animalThumbnailPhoto: DeepPartial<AnimalThumbnailPhoto>[] = [];
    for (let i = 0; i < amount; i++) {
        const buf = Buffer.from('hello world', 'utf8');

        animalThumbnailPhoto.push({
            buffer: buf,
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
