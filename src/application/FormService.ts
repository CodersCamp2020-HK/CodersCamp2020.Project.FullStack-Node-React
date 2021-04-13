import Form from '@infrastructure/postgres/Form';
import { AnswerForm } from '@infrastructure/postgres/FormQuestion';
import { Repository } from 'typeorm';
import ApiError from '@infrastructure/ApiError';
import { validate } from 'class-validator';
import Animal from '@infrastructure/postgres/Animal';
import AdoptionStep from '@infrastructure/postgres/AdoptionStep';
import VolunteerHireStep from '@infrastructure/postgres/VolunteerHireStep';

interface Question {
    question: string;
    placeholder: AnswerForm;
}

export interface FormCreationParams {
    name: string;
    questions: Question[];
}

export class FormService {
    constructor(
        private formRepository: Repository<Form>,
        private animalRepository: Repository<Animal>,
        private adoptionStepRepository: Repository<AdoptionStep>,
        private volunteerHireStepRepository: Repository<VolunteerHireStep>,
    ) {}

    public async create(formCreationParams: FormCreationParams): Promise<void> {
        const potentialForm = await this.formRepository.findOne({
            where: {
                name: formCreationParams.name,
            },
        });

        if (potentialForm) {
            throw new ApiError('Bad Request', 400, 'Form with this name already exist');
        }

        const form = this.formRepository.create(formCreationParams);
        const errors = await validate(form);
        if (errors.length > 0) {
            throw new Error(`Validation failed!`);
        } else {
            await this.formRepository.save(form);
        }
    }

    public async get(animalId: number): Promise<AdoptionStep> {
        const animal = await this.animalRepository.findOne(animalId, { relations: ['specie'] });
        if (!animal) throw new ApiError('Not Found', 404, 'Animal not found in database!');
        const form = await this.adoptionStepRepository
            .createQueryBuilder('step')
            .leftJoinAndSelect('step.form', 'form')
            .leftJoin('step.specie', 'specie')
            .leftJoinAndSelect('form.questions', 'questions')
            .where('specie.id = :id', { id: animal.specie.id })
            .getOne();
        if (!form) throw new ApiError('Not Found', 404, 'Survey not found in database');
        return form;
    }

    public async getAll(): Promise<Form[]> {
        const form = await this.formRepository.find({ relations: ['questions'] });
        if (!form) throw new ApiError('Not Found', 404, 'Surveys not found in database');
        return form;
    }

    public async getVolunteerForm(step: number): Promise<VolunteerHireStep> {
        const form = await this.volunteerHireStepRepository
            .createQueryBuilder('step')
            .leftJoinAndSelect('step.form', 'form')
            .leftJoinAndSelect('form.questions', 'questions')
            .where('step.number = :number', { number: step })
            .andWhere('form IS NOT NULL')
            .getOne();
        if (!form) throw new ApiError('Not Found', 404, 'Form not found in database');
        return form;
    }
}
