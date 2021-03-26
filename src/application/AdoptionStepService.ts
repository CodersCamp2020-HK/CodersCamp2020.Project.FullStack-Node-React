import { Repository } from 'typeorm';
import ApiError from '@infrastructure/ApiError';
import AdoptionStep from '@infrastructure/postgres/AdoptionStep';
import Specie from '@infrastructure/postgres/Specie';

export class AdoptionStepService {
    constructor(
        private AdoptionStepRepository: Repository<AdoptionStep>,
        private SpecieRepository: Repository<Specie>,
    ) {}

    public async getAll(specie?: string): Promise<AdoptionStep[]> {
        const adoptionSteps = await this.AdoptionStepRepository.find({
            where: {
                organization: {
                    id: 1,
                },
            },
        });
        if (!adoptionSteps) throw new ApiError('Not found', 404, 'Adoption steps not found');
        return adoptionSteps;
    }
}
