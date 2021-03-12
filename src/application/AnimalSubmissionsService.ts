import FormAnimalSubmission from '@infrastructure/postgres/FormAnimalSubmission';
import { Repository } from 'typeorm';

export enum FormStatus {
    IN_PROGRESS = 'inProgress',
    REJECTED = 'rejected',
    ACCEPTED = 'accepted',
}

export interface AdoptersCount {
    description: string;
    count: number;
}

export class AnimalSubmissionsService {
    constructor(private animalSubmissionRepository: Repository<FormAnimalSubmission>) {}

    public async adoptWillingnessCounter(petName: string): Promise<AdoptersCount> {
        console.log(petName);
        const count = await this.animalSubmissionRepository
            .createQueryBuilder('submission')
            .select()
            .leftJoinAndSelect('submission.animal', 'animal')
            .where('animal.name = :petName', { petName: petName })
            .getCount();

        return {
            description: 'Adopters willing to adopt a given animal',
            count,
        }
    }
}
