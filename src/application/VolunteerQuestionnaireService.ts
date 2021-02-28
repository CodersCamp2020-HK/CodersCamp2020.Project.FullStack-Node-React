import { VolunteerQuestionnaire } from '@infrastructure/postgres/VolunteerQuestionnaire';
import { Repository } from 'typeorm';

export type VolunteerQuestionnaireCreationParams = Pick<VolunteerQuestionnaire, 'a1'>;

export class VolunteerQuestionnaireService {
    constructor(private volunteerQuestionnaireRepository: Repository<VolunteerQuestionnaire>) {}

    public async create({ a1 }: VolunteerQuestionnaireCreationParams): Promise<void> {
        const volunteerQuestionnaire = this.volunteerQuestionnaireRepository.create({ a1 });
        await this.volunteerQuestionnaireRepository.save(volunteerQuestionnaire);
    }
}
