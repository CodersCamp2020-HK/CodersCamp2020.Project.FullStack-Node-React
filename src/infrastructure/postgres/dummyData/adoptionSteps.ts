import { DeepPartial } from 'typeorm';
import AdoptionStep from '../AdoptionStep';

export const seedAdoptionStep = (): DeepPartial<AdoptionStep>[] => {
    const adoptionStep: DeepPartial<AdoptionStep>[] = [
        {
            name: 'Krok 1 - wypełnienie formularza',
            description: 'Krok zawierający formularz adopcyjny dla psa. Wymagany do adopcji',
            number: 1,
            organization: { id: 1 },
            specie: { id: 1 },
            form: { id: 1 },
        },
    ];
    return adoptionStep;
};
