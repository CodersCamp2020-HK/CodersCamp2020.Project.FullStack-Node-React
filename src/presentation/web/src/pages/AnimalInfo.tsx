import { Grid } from '@material-ui/core';
import React from 'react';
import { useParams } from 'react-router';
import AnimalInfoCard from '../components/animalInfoCard/AnimalInfoCard';
import AnimalInfoDescription from '../components/animalInfoDescription/AnimalInfoDescription';
import Slider from '../components/slider/Slider';

const AnimalInfo = () => {
    let { animalId } = useParams<{ animalId?: string | undefined; }>();
    return (
        <Grid container spacing={3}>
            <Grid item xs={8}>
                <Slider photos={[]} />
            </Grid>
            <Grid item xs={4}>
                <AnimalInfoCard animalId={animalId as unknown as number} />
            </Grid>
            <Grid item xs={8}>
                <AnimalInfoDescription animalId={animalId as unknown as number} />
            </Grid>
            
        </Grid>
    )
}

export default AnimalInfo;