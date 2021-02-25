import { AnimalAdditionalInfo } from '@infrastructure/postgres/AnimalAdditionalInfo';
import { Repository } from 'typeorm';

export type AnimalAdditionalInfoParams = Pick<
    AnimalAdditionalInfo,
    | 'accepts_kids'
    | 'accepts_other_animals'
    | 'admission_to_shelter'
    | 'adoption_date'
    | 'need_donations'
    | 'temporary_home'
    | 'virtual_adoption'
>;

export class AnimalAdditionalInfoService {
    constructor(private animalRepository: Repository<AnimalAdditionalInfo>) {}

    public async create(animalAdditionalInfoParams: AnimalAdditionalInfoParams): Promise<void> {
        const animal = this.animalRepository.create(animalAdditionalInfoParams);
        await this.animalRepository.save(animal);
    }
}
