import Form from '@infrastructure/postgres/Form';
import FormQuestion from '@infrastructure/postgres/FormQuestion';
import { Repository } from 'typeorm';
import ApiError from '@infrastructure/ApiError';
import FormVolunteerSubmission, { VolunteerFormStatus } from '@infrastructure/postgres/FormVolunteerSubmission';
import FormAnimalSubmission from '@infrastructure/postgres/FormAnimalSubmission';

export interface FormCreationParams {
    name: string;
    questions: Omit<FormQuestion, 'id' | 'form'>[];
}

export enum SubmissionType {
    ADOPTION = 'adoption',
    VOLUNTEER = 'volunteer',
}

export interface ChangeStatusForVolunterFormParams {
    status: VolunteerFormStatus;
    userId: number;
}

export interface ChangeStatusForAdoptionFormParams {
    status: VolunteerFormStatus;
    userId: number;
    animalId: number;
}

export class FormService {
    constructor(
        private formRepository: Repository<Form>,
        private volunteerSubmissionRepository: Repository<FormVolunteerSubmission>,
        private animalSubmissionRepository: Repository<FormAnimalSubmission>,
    ) {}

    public async create(formCreationParams: FormCreationParams): Promise<void> {
        const form = this.formRepository.create(formCreationParams);
        await this.formRepository.save(form);
    }

    public async get(id: number): Promise<Form> {
        const form = await this.formRepository.findOne(id, { relations: ['questions'] });
        if (!form) throw new ApiError('Not Found', 404, 'Survey not found in database');
        return form;
    }

    public async getAll(): Promise<Form[]> {
        const form = await this.formRepository.find({ relations: ['questions'] });
        if (!form) throw new ApiError('Not Found', 404, 'Surveys not found in database');
        return form;
    }

    public async changeStatusForVolunteerForm(changeStatusParams: ChangeStatusForVolunterFormParams): Promise<void> {
        await this.volunteerSubmissionRepository
            .createQueryBuilder()
            .update()
            .set({ status: changeStatusParams.status })
            .where('userId = :id', { id: changeStatusParams.userId })
            .execute();
        return;
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
}
