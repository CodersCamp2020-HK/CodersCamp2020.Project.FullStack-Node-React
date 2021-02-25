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
        const {
            temporary_home,
            need_donations,
            virtual_adoption,
            adoption_date,
            admission_to_shelter,
            accepts_kids,
            accepts_other_animals,
        } = additional_info;
        const animalAdditionalInfo = this.animalAdditionalInfo.create({
            temporary_home,
            need_donations,
            virtual_adoption,
            adoption_date,
            admission_to_shelter,
            accepts_kids,
            accepts_other_animals,
        });
        animal.additional_info = animalAdditionalInfo;

        await this.animalRepository.save(animal);
    }

    public async update(
        id: number,
        { name, age, specie, description, ready_for_adoption, additional_info }: AnimalCreationParams,
    ): Promise<UpdateResult> {
        const {
            temporary_home,
            need_donations,
            virtual_adoption,
            adoption_date,
            admission_to_shelter,
            accepts_kids,
            accepts_other_animals,
        } = additional_info;
        const animalAdditionalInfo = this.animalAdditionalInfo.create({
            temporary_home,
            need_donations,
            virtual_adoption,
            adoption_date,
            admission_to_shelter,
            accepts_kids,
            accepts_other_animals,
        });
        return await getConnection()
            .createQueryBuilder()
            .update(Animal)
            .set({ name, age, specie, description, ready_for_adoption, additional_info: animalAdditionalInfo })
            .where('id = :id', { id })
            .execute();
    }
}
