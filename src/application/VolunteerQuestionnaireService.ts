import { Questionnaire, QuestionnaireQuestion } from '@infrastructure/postgres/VolunteerQuestionnaire';
import { Repository } from 'typeorm';

export interface VolunteerQuestionnaireCreationParams {
    name: string;
    questions: Omit<QuestionnaireQuestion, 'id' | 'questionnaire'>[];
}

export class VolunteerQuestionnaireService {
    constructor(private questionnaireRepository: Repository<Questionnaire>) {}

    public async create(volunteerQuestionnaireCreationParams: VolunteerQuestionnaireCreationParams): Promise<void> {
        const volunteerQuestionnaire = this.questionnaireRepository.create(volunteerQuestionnaireCreationParams);
        await this.questionnaireRepository.save(volunteerQuestionnaire);
    }
}
