import ApiError from '@infrastructure/ApiError';
import { Questionnaire } from '@infrastructure/postgres/Survey';
import { Repository } from 'typeorm';

export class SurveyService {
    constructor(private surveyRepository: Repository<Questionnaire>) {}

    public async get(id: number): Promise<Questionnaire> {
        const surveyQuestionnaire = await this.surveyRepository.findOne(id);
        if (!surveyQuestionnaire) throw new ApiError('Not Found', 404, 'Survey not found in database');
        return surveyQuestionnaire;
    }

    public async getAll(): Promise<Questionnaire[]> {
        const surveyQuestionnaire = await this.surveyRepository.find();
        if (!surveyQuestionnaire) throw new ApiError('Not Found', 404, 'Surveys not found in database');
        return surveyQuestionnaire;
    }
}
