import { Repository } from 'typeorm';
import ApiError from '@infrastructure/ApiError';
import AdoptionStep from '@infrastructure/postgres/AdoptionStep';
import Specie from '@infrastructure/postgres/Specie';

export class AdoptionStepService {
    constructor(
        private adoptionStepRepository: Repository<AdoptionStep>,
        private specieRepository: Repository<Specie>,
    ) {}

    public async getAll(specie?: string): Promise<AdoptionStep[]> {
        if (specie) {
            const foundedSpecie = await this.specieRepository.findOne({
                where: {
                    specie,
                },
            });
            if (!foundedSpecie) throw new ApiError('Specie not found', 404, 'Specie not found');

            const adoptionSteps = await this.adoptionStepRepository.find({
                where: {
                    organization: {
                        id: 1,
                    },
                    specie: {
                        id: foundedSpecie.id,
                    },
                },
            });
            if (!adoptionSteps) throw new ApiError('Not found', 404, 'Adoption steps not found');
            return adoptionSteps;
        }

        const adoptionSteps = await this.adoptionStepRepository.find({
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
