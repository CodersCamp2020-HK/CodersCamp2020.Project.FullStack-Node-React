import { Repository } from 'typeorm';
import Calendar from '../infrastructure/postgres/Calendar';
import Animal from '../infrastructure/postgres/Animal';
import User from '../infrastructure/postgres/User';
import ApiError from '@infrastructure/ApiError';
import { IUserInfo } from '@infrastructure/Auth';
import { UserType } from '@infrastructure/postgres/OrganizationUser';

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

    public async getAll(): Promise<Calendar[]> {
        const visit = await this.calendarRepository
            .createQueryBuilder('calendar')
            .leftJoinAndSelect('calendar.user', 'user')
            .leftJoinAndSelect('calendar.animal', 'animal')
            .select(['calendar', 'user.id', 'user.name', 'user.surname', 'animal.id', 'animal.name'])
            .getMany();
        if (visit.length === 0) throw new ApiError('Not Found', 404, 'Visit in calendar not found');
        return visit;
    }

    public async get(id: number): Promise<Calendar> {
        const visit = await this.calendarRepository
            .createQueryBuilder('calendar')
            .leftJoin('calendar.user', 'user')
            .leftJoin('calendar.animal', 'animal')
            .select(['calendar', 'user.id', 'user.name', 'user.surname', 'animal.id', 'animal.name'])
            .where('calendar.id = :calendarId', { calendarId: id })
            .getOne();
        if (!visit) throw new ApiError('Not Found', 404, `Visit with id: ${id} not found in database`);
        return visit;
    }

    public async create(
        { date, animalId: animal, userId: user }: CalendarCreationParams,
        currentUser: IUserInfo,
    ): Promise<void> {
        if (currentUser.role == UserType.NORMAL || currentUser.role == UserType.VOLUNTEER) {
            if (user != currentUser.id) {
                throw new ApiError('Unauthorized', 401, 'User and volunteer can only create own calendar');
            }
        }

        const animalFromDB = await this.animalRepository.findOne(animal);
        if (!animalFromDB) throw new ApiError('Not Found', 404, `Animal with id: ${animal} not found in database`);
        const userFromDB = await this.userRepository.findOne(user);
        if (!userFromDB) throw new ApiError('Not Found', 404, `User with id: ${user} not found in database`);
        const visit = this.calendarRepository.create({ date, animal: animalFromDB, user: userFromDB });
        await this.calendarRepository.save(visit);
    }

    public async delete(id: number, currentUser: IUserInfo): Promise<void> {
        if (currentUser.role == UserType.NORMAL || currentUser.role == UserType.VOLUNTEER) {
            if (id != currentUser.id) {
                throw new ApiError('Unauthorized', 401, 'User and volunteer can only delete own calendar');
            }
        }

        const visitFromDB = await this.animalRepository.findOne(id);
        if (!visitFromDB) throw new ApiError('Not Found', 404, `Animal with id: ${id} not found in database`);
        await this.calendarRepository.delete(id);
    }
}
