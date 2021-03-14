import { DeepPartial } from 'typeorm';
import { AnimalThumbnailPhoto } from '../AnimalPhoto';

export const seedAnimalThumbnailPhoto = (amount: number): DeepPartial<AnimalThumbnailPhoto>[] => {
    const animalThumbnailPhoto: DeepPartial<AnimalThumbnailPhoto>[] = [];
    for (let i = 0; i < amount; i++) {
        // const randomSize = faker.random.arrayElement(Object.values(AnimalSize));
        const buf = Buffer.from('hello world', 'utf8');

        animalThumbnailPhoto.push({
            buffer: buf,
        });
    }
    return animalThumbnailPhoto;
};
