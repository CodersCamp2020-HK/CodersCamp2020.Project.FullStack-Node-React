import FormAnimalSubmission from '@infrastructure/postgres/FormAnimalSubmission';
import { Repository } from 'typeorm';
import OptionalWhereSelectQueryBuilder from 'utils/OptionalWhereSelectQueryBuilder';

export enum FormStatus {
    IN_PROGRESS = 'in progress',
    REJECTED = 'rejected',
    ACCEPTED = 'accepted',
}

interface getAllAnimalSubmissionsParams {
    date?: Date;
    specie?: string;
    status?: FormStatus;
}

export class AnimalSubmissionsService {
    constructor(private animalSubmissionRepository: Repository<FormAnimalSubmission>) {}

    public async getAllAnimalSubmissions(queryParams: getAllAnimalSubmissionsParams): Promise<FormAnimalSubmission[]> {
        return new OptionalWhereSelectQueryBuilder(this.animalSubmissionRepository.createQueryBuilder('submission'))
            .optAndWhere('submission.status = ', queryParams.status)
            .optAndWhere('submission.status = ', queryParams.date)
            .optAndWhere('submission.status = ', queryParams.specie)
            .selectQueryBuilder.getMany();
    }
}
