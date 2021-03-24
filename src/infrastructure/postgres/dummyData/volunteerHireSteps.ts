import { DeepPartial } from 'typeorm';
import VolunteerHireStep from '../VolunteerHireStep';

export const seedVolunteerHireStep = (): DeepPartial<VolunteerHireStep>[] => {
    const volunteerHireStep: DeepPartial<VolunteerHireStep>[] = [
        {
            name: 'Krok 1 - wypełnienie formularza',
            description: 'Formularz wymagany do przyjęcia kandydata na wolontariusza',
            form: { id: 3 },
            organization: { id: 1 },
            number: 1,
        },
        {
            name: 'Krok 2 - rozmowa kwalifykacyjna',
            description: 'Rozmowa kwalifykacyjna z kandydatem w schronisku',
            organization: { id: 1 },
            number: 2,
        },
    ];
    return volunteerHireStep;
};
