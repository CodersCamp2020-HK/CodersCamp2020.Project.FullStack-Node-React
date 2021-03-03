import { Questionnaire, QuestionnaireQuestion } from '@infrastructure/postgres/Questionnaire';
import { Repository } from 'typeorm';

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
}
