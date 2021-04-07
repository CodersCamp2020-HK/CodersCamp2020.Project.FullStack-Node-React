import { AnimalSize } from '@infrastructure/postgres/AnimalAdditionalInfo';

const formatSize = (size: AnimalSize): string => {
    if (size === 'small') return 'mały';
    if (size === 'medium') return 'średni';
    if (size === 'large') return 'duży';
    return 'nieznany';
};

export default formatSize;
