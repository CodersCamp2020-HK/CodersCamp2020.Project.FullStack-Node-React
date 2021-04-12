import { Repository } from 'typeorm';
import ApiError from '@infrastructure/ApiError';
import Animal from '@infrastructure/postgres/Animal';
import AdoptionStep from '@infrastructure/postgres/AdoptionStep';

export class AdoptionStepService {
    constructor(
        private animalRepository: Repository<Animal>,
        private adoptionStepRepository: Repository<AdoptionStep>,
    ) {}

    public async getAllSteps(id: number): Promise<AdoptionStep[]> {
        const animal = await this.animalRepository.findOne(id, { relations: ['specie'] });
        if (!animal) throw new ApiError('Not Found', 404, 'Animal not found in database!');
        const steps = await this.adoptionStepRepository
            .createQueryBuilder('step')
            .leftJoin('step.specie', 'specie')
            .where('specie.id = :id', { id: animal.specie.id })
            .getMany();
        if (!steps) throw new ApiError('Not Found', 404, 'Survey not found in database');
        return steps;
    }
}
