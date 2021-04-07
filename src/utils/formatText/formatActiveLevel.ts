import { AnimalActiveLevel } from '@infrastructure/postgres/AnimalAdditionalInfo';

const formatActiveLevel = (activeLevel: AnimalActiveLevel): string => {
    if (activeLevel === 'low') return 'niska';
    if (activeLevel === 'medium') return 'umiarkowana';
    if (activeLevel === 'high') return 'wysoka';
    return 'nieznana';
};

export default formatActiveLevel;
