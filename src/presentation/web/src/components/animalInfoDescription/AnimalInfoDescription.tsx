import { Paper, Typography } from '@material-ui/core';
import React from 'react';
import { useGetAnimal } from '../../client/index';
interface AnimalInfoDescriptionProps {
    animalId: number;
}
const AnimalInfoDescription = ({ animalId }: AnimalInfoDescriptionProps) => {
    const { data: animal } = useGetAnimal({ animalId });
    return (
        <Paper>
            <Typography>{animal && animal.description}</Typography>
        </Paper>
    );
};

export default AnimalInfoDescription;
