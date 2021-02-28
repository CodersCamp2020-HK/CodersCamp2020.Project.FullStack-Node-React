import { Animal } from '@infrastructure/postgres/Animal';
import { AnimalAdditionalInfo } from '@infrastructure/postgres/AnimalAdditionalInfo';
import { Repository } from 'typeorm';
import { assign } from 'lodash';

export type AnimalCreationParams = Pick<
    Animal,
    'name' | 'age' | 'specie' | 'description' | 'ready_for_adoption' | 'additional_info'
>;

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

    public async create({
        name,
        age,
        specie,
        description,
        ready_for_adoption,
        additional_info,
    }: AnimalCreationParams): Promise<void> {
        const animal = this.animalRepository.create({
            name,
            age,
            specie,
            description,
            ready_for_adoption,
        });
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id: _, ...animalAdditionalInfoParams } = additional_info;
        const animalAdditionalInfo = this.animalAdditionalInfo.create(animalAdditionalInfoParams);
        animal.additional_info = animalAdditionalInfo;

        await this.animalRepository.save(animal);
    }

    public async update(id: number, updatedAnimal: Partial<AnimalCreationParams>): Promise<Animal> {
        const animal = await this.get(id);
        if (!animal) throw { status: 404, message: `Animal with id: ${id} not found!` };
        if (updatedAnimal.additional_info) updatedAnimal.additional_info.id = animal.additional_info.id;
        await this.animalRepository
            .createQueryBuilder()
            .update(Animal)
            .set(updatedAnimal)
            .where('id = :id', { id })
            .execute();
        return assign(animal, this.animalAdditionalInfo);
    }
}
