import { AnimalAdditionalInfo } from '@infrastructure/postgres/AnimalAdditionalInfo';
import { Repository } from 'typeorm';

export type AnimalAdditionalInfoParams = Pick<
    AnimalAdditionalInfo,
    | 'acceptsKids'
    | 'acceptsOtherAnimals'
    | 'admissionToShelter'
    | 'adoptionDate'
    | 'needDonations'
    | 'temporaryHome'
    | 'virtualAdoption'
>;

export class AnimalAdditionalInfoService {
    constructor(private animalRepository: Repository<AnimalAdditionalInfo>) {}

    public async create(animalAdditionalInfoParams: AnimalAdditionalInfoParams): Promise<void> {
        const animal = this.animalRepository.create(animalAdditionalInfoParams);
        await this.animalRepository.save(animal);
    }
}
