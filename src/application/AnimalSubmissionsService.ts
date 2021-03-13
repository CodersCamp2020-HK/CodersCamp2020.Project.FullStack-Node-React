import ApiError from '@infrastructure/ApiError';
import FormAnimalSubmission, { AnimalFormStatus } from '@infrastructure/postgres/FormAnimalSubmission';
import { Repository } from 'typeorm';
import OptionalWhereSelectQueryBuilder from 'utils/OptionalWhereSelectQueryBuilder';

export enum FormStatus {
    IN_PROGRESS = 'inProgress',
    REJECTED = 'rejected',
    ACCEPTED = 'accepted',
}

/**
 * Show the number of adopters wanting to adopt given animal
 */
export interface AdoptersCount {
    description: string;
    count: number;
}

interface getAllAnimalSubmissionsParams {
    date?: Date;
    specie?: string;
    status?: AnimalFormStatus;
}

export interface ChangeStatusForAdoptionFormParams {
    status: AnimalFormStatus;
    userId: number;
    animalId: number;
}

export class AnimalSubmissionsService {
    constructor(private animalSubmissionRepository: Repository<FormAnimalSubmission>) {}

    public async adoptWillingnessCounter(petName: string): Promise<AdoptersCount> {
        const count = await this.animalSubmissionRepository
            .createQueryBuilder('submission')
            .select()
            .leftJoinAndSelect('submission.animal', 'animal')
            .where('animal.name = :petName', { petName: petName })
            .getCount();

        return {
            description: 'Adopters willing to adopt a given animal',
            count,
        };
    }
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

    public async changeStatusForAdoptionForm(changeStatusParams: ChangeStatusForAdoptionFormParams): Promise<void> {
        await this.animalSubmissionRepository
            .createQueryBuilder()
            .update()
            .set({ status: changeStatusParams.status })
            .where('applicantId = :id', { id: changeStatusParams.userId })
            .andWhere('animalId = :id', { id: changeStatusParams.animalId })
            .execute();
        return;
    }

    public async getAnimalSubmission(id: number): Promise<FormAnimalSubmission> {
        const submission = await this.animalSubmissionRepository.findOne(id, {
            relations: ['animal', 'applicant', 'answers', 'reviewer'],
        });

        if (!submission) throw new ApiError('Not Found', 404, `Submission with ${id} not found`);

        return submission;
    }
}
