import Questionnaire from '@infrastructure/postgres/Form';
import QuestionnaireQuestion from '@infrastructure/postgres/FormQuestion';
import { Repository } from 'typeorm';
import ApiError from '@infrastructure/ApiError';

export interface QuestionnaireCreationParams {
    name: string;
    questions: Omit<QuestionnaireQuestion, 'id' | 'questionnaire'>[];
}

export class QuestionnaireService {
    constructor(private questionnaireRepository: Repository<Questionnaire>) {}

    public async create(questionnaireCreationParams: QuestionnaireCreationParams): Promise<void> {
        const questionnaire = this.questionnaireRepository.create(questionnaireCreationParams);
        await this.questionnaireRepository.save(questionnaire);
    }

    public async get(id: number): Promise<Questionnaire> {
        const surveyQuestionnaire = await this.questionnaireRepository.findOne(id, { relations: ['questions'] });
        if (!surveyQuestionnaire) throw new ApiError('Not Found', 404, 'Survey not found in database');
        return surveyQuestionnaire;
    }

    public async getAll(): Promise<Questionnaire[]> {
        const surveyQuestionnaire = await this.questionnaireRepository.find({ relations: ['questions'] });
        if (!surveyQuestionnaire) throw new ApiError('Not Found', 404, 'Surveys not found in database');
        return surveyQuestionnaire;
    }
}
