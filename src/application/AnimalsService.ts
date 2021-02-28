import { Animal } from '@infrastructure/postgres/Animal';
import { AnimalAdditionalInfo } from '@infrastructure/postgres/AnimalAdditionalInfo';
import { Repository } from 'typeorm';
import { assign } from 'lodash';

type AnimalParams = Pick<Animal, 'name' | 'age' | 'specie' | 'description' | 'ready_for_adoption'>;
type AnimalAdditionalInfoParams = Omit<AnimalAdditionalInfo, 'id'>;
export type AnimalCreationParams = AnimalParams & AnimalAdditionalInfoParams;
export type AnimalUpdateParams = Partial<AnimalParams & AnimalAdditionalInfoParams>;

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
        ...additional_info
    }: AnimalCreationParams): Promise<void> {
        const animal = this.animalRepository.create({
            name,
            age,
            specie,
            description,
            ready_for_adoption,
        });
        const animalAdditionalInfo = this.animalAdditionalInfo.create(additional_info);
        animal.additional_info = animalAdditionalInfo;

        await this.animalRepository.save(animal);
    }

    public async update(id: number, updateParams: AnimalUpdateParams): Promise<Animal> {
        const animal = await this.get(id);
        if (!animal) throw { status: 404, message: `Animal with id: ${id} not found!` };
        const updatedAnimal = assign(animal, updateParams);
        console.log(updatedAnimal);
        await this.animalRepository
            .createQueryBuilder()
            .update(Animal)
            .set(updatedAnimal)
            .where('id = :id', { id })
            .execute();
        console.log(updatedAnimal);
        return updatedAnimal;
    }
}
