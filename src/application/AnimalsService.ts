import { Animal } from '@infrastructure/postgres/Animal';
import { AnimalAdditionalInfo } from '@infrastructure/postgres/AnimalAdditionalInfo';
import { Repository } from 'typeorm';
import { arePropertiesUndefined } from 'utils/ArePropertiesUndefined';
import ApiError from '@infrastructure/ApiError';

type AnimalParams = Pick<Animal, 'name' | 'age' | 'specie' | 'description' | 'ready_for_adoption'>;
type AnimalAdditionalInfoParams = Omit<AnimalAdditionalInfo, 'id'>;
export type AnimalCreationParams = AnimalParams & { additionalInfo: AnimalAdditionalInfoParams };
export type AnimalUpdateParams = Partial<AnimalParams & { additionalInfo: Partial<AnimalAdditionalInfoParams> }>;

export class AnimalsService {
    constructor(
        private animalRepository: Repository<Animal>,
        private animalAdditionalInfo: Repository<AnimalAdditionalInfo>,
    ) {}

    public async get(id: number): Promise<Animal> {
        const animal = await this.animalRepository.findOne(id);
        if (!animal) throw new ApiError('Not Found', 404, 'Animal not found in database');

        return animal;
    }

    public async create({ additionalInfo, ...animalParams }: AnimalCreationParams): Promise<void> {
        const animal = this.animalRepository.create(animalParams);
        const animalAdditionalInfo = this.animalAdditionalInfo.create(additionalInfo);
        animal.additional_info = animalAdditionalInfo;

        await this.animalRepository.save(animal);
    }

    public async update(id: number, { additionalInfo, ...animalParams }: AnimalUpdateParams): Promise<Animal> {
        const animal = await this.animalRepository.findOne(id, { relations: ['additional_info'] });
        if (!animal) throw new ApiError('Not Found', 404, `Animal with id: ${id} not found!`);
        if (id % 1 !== 0) throw new ApiError('Bad Request', 400, 'Id cannot be floating point number!');
        if (arePropertiesUndefined({ additionalInfo, ...animalParams }))
            throw new ApiError('Bad Request', 400, 'No data provided!');
        const updatedAnimal = {
            ...animal,
            ...animalParams,
            additional_info: { ...animal.additional_info, ...additionalInfo },
        };

        return await this.animalRepository.save(updatedAnimal);
    }
}
