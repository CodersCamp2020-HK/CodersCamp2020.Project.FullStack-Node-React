import Form from '@infrastructure/postgres/Form';
import { AnswerForm } from '@infrastructure/postgres/FormQuestion';
import { Repository } from 'typeorm';
import ApiError from '@infrastructure/ApiError';

interface Question {
    question: string;
    placeholder: AnswerForm;
}

export interface FormCreationParams {
    name: string;
    questions: Question[];
}

export class FormService {
    constructor(private formRepository: Repository<Form>) {}

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
}
