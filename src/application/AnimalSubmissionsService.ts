import ApiError from '@infrastructure/ApiError';
import FormAnimalSubmission from '@infrastructure/postgres/FormAnimalSubmission';
import { Repository } from 'typeorm';
import OptionalWhereSelectQueryBuilder from 'utils/OptionalWhereSelectQueryBuilder';

export enum FormStatus {
    IN_PROGRESS = 'inProgress',
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
        const submissions = await new OptionalWhereSelectQueryBuilder(
            this.animalSubmissionRepository.createQueryBuilder('submission'),
        )
            .optAndWhere('submission.status = ', queryParams.status)
            .optAndWhere('submission.status = ', queryParams.date)
            .optAndWhere('submission.status = ', queryParams.specie)
            .selectQueryBuilder.getMany();

        if (submissions.length === 0) throw new ApiError('Not Found', 404, 'Submissions not found');

        return submissions;
    }
}
