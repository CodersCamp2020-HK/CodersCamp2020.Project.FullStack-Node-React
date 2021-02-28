import { Animal } from '@infrastructure/postgres/Animal';
import { AnimalAdditionalInfo } from '@infrastructure/postgres/AnimalAdditionalInfo';
import { Repository } from 'typeorm';
import { arePropertiesUndefined } from 'utils/ArePropertiesUndefined';

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
        if (!animal) throw new Error('Animal not found in database');
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
        if (!animal) throw { status: 404, message: `Animal with id: ${id} not found!` };
        if (arePropertiesUndefined({ additionalInfo, ...animalParams })) throw { status: 400, message: 'No data' };
        const updatedAnimal = {
            ...animal,
            ...animalParams,
            additional_info: { ...animal.additional_info, ...additionalInfo },
        };

        return await this.animalRepository.save(updatedAnimal);
    }
}
