import FormAnimalSubmission from '@infrastructure/postgres/FormAnimalSubmission';
import { Repository } from 'typeorm';

export enum FormStatus {
    IN_PROGRESS = 'inProgress',
    REJECTED = 'rejected',
    ACCEPTED = 'accepted',
}

export class AnimalSubmissionsService {
    constructor(private animalSubmissionRepository: Repository<FormAnimalSubmission>) {}

    public adoptWillingnessCounter(petName: string): number {
        console.log(petName);
        this.animalSubmissionRepository.findOne();
        return 1;
    }
}
