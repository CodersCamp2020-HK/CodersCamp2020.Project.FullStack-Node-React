import ApiError from '@infrastructure/ApiError';
import { IUserInfo } from '@infrastructure/Auth';
import { UserType } from '@infrastructure/postgres/OrganizationUser';
import { validate } from 'class-validator';
import { Repository } from 'typeorm';
import Animal from '../infrastructure/postgres/Animal';
import Calendar from '../infrastructure/postgres/Calendar';
import User from '../infrastructure/postgres/User';

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
            .leftJoin('calendar.user', 'user')
            .leftJoin('calendar.animal', 'animal')
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
        //check if date format valid
        const currentDate = new Date();
        const visitDate = new Date(date);

        if (visitDate < currentDate) {
            throw new ApiError('Bad request', 400, 'Date cannot be earlier than current date');
        }

        if (visitDate.getMinutes() > 0 || visitDate.getSeconds() > 0 || visitDate.getMilliseconds() > 0) {
            throw new ApiError(
                'Bad request',
                400,
                'Wrong format! Minutes, seconds and milliseconds must be equal zero',
            );
        }

        if (currentUser.role == UserType.NORMAL || currentUser.role == UserType.VOLUNTEER) {
            if (user != currentUser.id) {
                throw new ApiError('Unauthorized', 401, 'User and volunteer can only create own calendar');
            }
        }

        const potentialCurrentUserVisit = await this.calendarRepository.findOne({
            where: {
                user: { id: user },
                date: date,
            },
        });

        if (potentialCurrentUserVisit) {
            throw new ApiError('Unauthorized', 401, 'User already has a visit in this time');
        }

        // const potentialOtherUserVisit = await this.calendarRepository.findOne({
        //     where: {
        //         animal: { id: animal },
        //         date: date,
        //     },
        // });

        // if (potentialOtherUserVisit) {
        //     throw new ApiError('Unauthorized', 401, 'Someone other has a visit with this animal in this time');
        // }

        const animalFromDB = await this.animalRepository.findOne(animal);
        if (!animalFromDB) throw new ApiError('Not Found', 404, `Animal with id: ${animal} not found in database`);

        const userFromDB = await this.userRepository.findOne(user);
        if (!userFromDB) throw new ApiError('Not Found', 404, `User with id: ${user} not found in database`);

        const visit = this.calendarRepository.create({ date, animal: animalFromDB, user: userFromDB });

        const errors = await validate(visit);
        if (errors.length > 0) {
            throw new Error(`Validation failed!`);
        } else {
            await this.calendarRepository.save(visit);
        }
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

    public async getByUserId(userId: number, user: IUserInfo): Promise<Calendar> {
        if (user.role == UserType.NORMAL || user.role == UserType.VOLUNTEER) {
            if (userId != user.id) {
                throw new ApiError('Unauthorized', 401, 'User and volunteer can only create own calendar');
            }
        }

        const visit = await this.calendarRepository
            .createQueryBuilder('calendar')
            .leftJoin('calendar.user', 'user')
            .leftJoin('calendar.animal', 'animal')
            .select(['calendar', 'user.id', 'user.name', 'user.surname', 'animal.id', 'animal.name'])
            .where('user.id = :userId', { userId })
            .getOne();
        if (!visit) throw new ApiError('Not Found', 404, `Visit for user with id: ${userId} not found in database`);

        return visit;
    }
}
