import { DeepPartial } from 'typeorm';
import AdoptionStep from '../AdoptionStep';

export const seedAdoptionStep = (): DeepPartial<AdoptionStep>[] => {
    const adoptionStep: DeepPartial<AdoptionStep>[] = [
        {
            name: 'Przesłanie wniosku',
            description: 'Krok zawierający formularz adopcyjny dla psa. Wymagany do adopcji',
            number: 1,
            organization: { id: 1 },
            specie: { id: 1 },
            form: { id: 1 },
        },
        {
            name: 'Rozpatrywanie wniosku',
            description: 'Formularz czeka na akceptację przez pracownika schroniska',
            number: 2,
            organization: { id: 1 },
            specie: { id: 1 },
        },
        {
            name: 'Spotkanie w schronisku',
            description: 'Jednorazowe spotkanie adoptującego z psem w schronisku',
            number: 3,
            organization: { id: 1 },
            specie: { id: 1 },
        },
        {
            name: 'Oczekiwanie na spotkanie',
            description:
                'Przychodząc do nas zarezerwuj sobie kilka godzin na oglądanie i poznanie naszych zwierząt. Nie spiesz - adopcja to czesto decyznja na najbliszych kilkanaście lat.',
            number: 4,
            organization: { id: 1 },
            specie: { id: 1 },
        },
        {
            name: 'Podpisanie umowy',
            description: 'Aby sfinalizować adopcję należy dopełnić wszystkich formalności',
            number: 5,
            organization: { id: 1 },
            specie: { id: 1 },
        },
        {
            name: 'Przesłanie wniosku',
            description: 'Krok zawierający formularz adopcyjny dla kota. Wymagany do adopcji',
            number: 1,
            organization: { id: 1 },
            specie: { id: 2 },
            form: { id: 1 },
        },
        {
            name: 'Rozpatrywanie wniosku',
            description: 'Formularz czeka na akceptację przez pracownika schroniska',
            number: 2,
            organization: { id: 1 },
            specie: { id: 2 },
        },
        {
            name: 'Spotkanie w schronisku',
            description: 'Jednorazowe spotkanie adoptującego z kotem w schronisku',
            number: 3,
            organization: { id: 1 },
            specie: { id: 2 },
        },
        {
            name: 'Oczekiwanie na spotkanie',
            description:
                'Przychodząc do nas zarezerwuj sobie kilka godzin na oglądanie i poznanie naszych zwierząt. Nie spiesz - adopcja to czesto decyznja na najbliszych kilkanaście lat.',
            number: 4,
            organization: { id: 1 },
            specie: { id: 2 },
        },
        {
            name: 'Podpisanie umowy',
            description: 'Aby sfinalizować adopcję należy dopełnić wszystkich formalności',
            number: 5,
            organization: { id: 1 },
            specie: { id: 2 },
        },
    ];
    return adoptionStep;
};
