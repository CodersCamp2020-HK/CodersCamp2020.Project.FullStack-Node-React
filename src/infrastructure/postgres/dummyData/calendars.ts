import { DeepPartial } from 'typeorm';
import * as faker from 'faker';
import Calendar from '../Calendar';

export const seedCalendars = (amount: number): DeepPartial<Calendar>[] => {
    const calendars: DeepPartial<Calendar>[] = [];
    for (let i = 0; i < amount; i++) {
        // const randomSize = faker.random.arrayElement(Object.values(AnimalSize));
        // const randomActiveLevel = faker.random.arrayElement(Object.values(AnimalActiveLevel));

        calendars.push({
            date: faker.date.soon(),
            user: { id: i + 1 },
            animal: { id: i + 1 },
        });
    }
    return calendars;
};
