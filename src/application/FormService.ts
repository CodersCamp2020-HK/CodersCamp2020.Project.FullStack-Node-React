import Form from '@infrastructure/postgres/Form';
import FormQuestion from '@infrastructure/postgres/FormQuestion';
import { Repository } from 'typeorm';
import ApiError from '@infrastructure/ApiError';
import FormVolunteerSubmission, { VolunterFormStatus } from '@infrastructure/postgres/FormVolunteerSubmission';
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
    status: VolunterFormStatus;
    userId: number;
}

export interface ChangeStatusForAdoptionFormParams {
    status: VolunterFormStatus;
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
        console.log(this.volunteerSubmissionRepository);
        console.log(changeStatusParams);
        // await this.volunteerSubmissionRepository
        //     .createQueryBuilder()
        //     .update(FormVolunteerSubmission)
        //     .set({ status: changeStatusParams.status })
        //     .where('userId = :id', { id: changeStatusParams.userId })
        //     .execute();
        return;
    }

    public async changeStatusForAdoptionForm(changeStatusParams: ChangeStatusForAdoptionFormParams): Promise<void> {
        console.log(this.animalSubmissionRepository);
        console.log(changeStatusParams);
        await this.animalSubmissionRepository
            .createQueryBuilder()
            .update(FormAnimalSubmission)
            .set({ status: changeStatusParams.status })
            .where('applicantId = :id', { id: changeStatusParams.userId })
            .andWhere('animalId = :id', { id: changeStatusParams.animalId })
            .execute();
        return;
    }
}
