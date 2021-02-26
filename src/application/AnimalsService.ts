import { Animal } from '@infrastructure/postgres/Animal';
import { AnimalAdditionalInfo } from '@infrastructure/postgres/AnimalAdditionalInfo';
import { getConnection, Repository, UpdateResult } from 'typeorm';

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

    public async update(
        id: number,
        { name, age, specie, description, ready_for_adoption, additional_info }: AnimalCreationParams,
    ): Promise<UpdateResult> {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id: _, ...animalAdditionalInfoParams } = additional_info;
        return await getConnection()
            .createQueryBuilder()
            .update(Animal)
            .set({ name, age, specie, description, ready_for_adoption, additional_info: animalAdditionalInfoParams })
            .where('id = :id', { id })
            .execute();
    }
}
