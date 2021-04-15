import { Grid } from '@material-ui/core';
import React from 'react';
import { useParams } from 'react-router';
import { useGetAnimal, useGetAnimalPhotos } from '../client/index';
import AnimalInfoCard from '../components/animalInfoCard/AnimalInfoCard';
import AnimalInfoDescription from '../components/animalInfoDescription/AnimalInfoDescription';
import Slider from '../components/slider/Slider';
import GridContainer from '../components/gridContainer/GridContainer';
import LoadingCircle from '../components/loadingCircle/LoadingCircle';
import NotFound from '../pages/NotFound'

const AnimalInfo = () => {
    let { animalId } = useParams<{ animalId?: string | undefined }>();
    let { data: animal } = useGetAnimal({ animalId: (animalId as unknown) as number });
    let { data: photosFromDb, loading } = useGetAnimalPhotos({ animalId: (animalId as unknown) as number });
    let photos = [];

    if (animal && animal.thumbnail) {
        const base64 = Buffer.from(animal.thumbnail.buffer).toString('base64');
        photos.push(base64);
    }

    if (animal && photosFromDb && photosFromDb.length >= 0) {
        const base64Array = photosFromDb.map((image) => Buffer.from(image.buffer).toString('base64'));
        photos.push(...base64Array);
    }

    return !animal || !animal.readyForAdoption <NotFound /> : (
        <GridContainer marginBottom={0} marginTop={0} spacing={2} align="center" justify="center">
            <Grid item xs={12} sm={8}>
                {loading ? <LoadingCircle size={70} /> : <Slider photos={[...photos]} />}
                <AnimalInfoDescription animalId={(animalId as unknown) as number} />
            </Grid>
            <Grid item xs={12} sm={4}>
                <AnimalInfoCard animalId={(animalId as unknown) as number} />
            </Grid>
        </GridContainer>
    );
};

export default AnimalInfo;
