import { Repository } from 'typeorm';
import Calendar from '../infrastructure/postgres/Calendar';
import Animal from '../infrastructure/postgres/Animal';
import User from '../infrastructure/postgres/User';
import ApiError from '@infrastructure/ApiError';

export interface CalendarCreationParams {
    date: Date;
    animalId: number;
    userId: number;
}

export class CalendarService {
    constructor(
        private calendarRepository: Repository<Calendar>,
        private animalRepository: Repository<Animal>,
        private userRepository: Repository<User>,
    ) {}

    public async getAll(): Promise<Calendar> {
        const visit = await this.calendarRepository.findOne();
        if (!visit) throw new ApiError('Not Found', 404, 'Visit in calendar not found');
        return visit;
    }

    public async get(id: number): Promise<Calendar> {
        const visit = await this.calendarRepository.findOne(id);
        if (!visit) throw new ApiError('Not Found', 404, `Visit with id: ${id} not found in database`);
        return visit;
    }

    public async create({ date, animalId: animal, userId: user }: CalendarCreationParams): Promise<void> {
        const animalFromDB = await this.animalRepository.findOne(animal);
        if (!animalFromDB) throw new ApiError('Not Found', 404, `Animal with id: ${animal} not found in database`);
        const userFromDB = await this.userRepository.findOne(user);
        if (!userFromDB) throw new ApiError('Not Found', 404, `User with id: ${user} not found in database`);
        const visit = this.calendarRepository.create({ date, animal, user });
        await this.calendarRepository.save(visit);
    }

    public async delete(id: number): Promise<void> {
        const visitFromDB = await this.animalRepository.findOne(id);
        if (!visitFromDB) throw new ApiError('Not Found', 404, `Animal with id: ${id} not found in database`);
        await this.calendarRepository.delete(id);
    }
}
