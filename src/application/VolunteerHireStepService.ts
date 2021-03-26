import { Repository } from 'typeorm';
import ApiError from '@infrastructure/ApiError';
import VolunteerHireStep from '@infrastructure/postgres/VolunteerHireStep';

export class VolunteerHireStepService {
    constructor(private volunteerHireStepRepository: Repository<VolunteerHireStep>) {}

    public async getAll(): Promise<VolunteerHireStep[]> {
        const volunteerSteps = await this.volunteerHireStepRepository.find({
            where: {
                organization: {
                    id: 1,
                },
            },
        });
        if (!volunteerSteps) throw new ApiError('Not found', 404, 'Volunteer steps not found');
        return volunteerSteps;
    }
}
