import { Repository } from 'typeorm';
import ApiError from '@infrastructure/ApiError';
import VolunteerHireStep from '@infrastructure/postgres/VolunteerHireStep';

export class VolunteerHireStepService {
    constructor(private volunteerHireStepRepository: Repository<VolunteerHireStep>) {}

    public async get(userId: number): Promise<VolunteerHireStep> {
        
    }
}
