import { Grid } from '@material-ui/core';
import React from 'react';
import { useParams } from 'react-router';
import { useGetAnimal } from '../client/index';
import AnimalInfoCard from '../components/animalInfoCard/AnimalInfoCard';
import AnimalInfoDescription from '../components/animalInfoDescription/AnimalInfoDescription';
import Slider from '../components/slider/Slider';

const AnimalInfo = () => {
    let { animalId } = useParams<{ animalId?: string | undefined }>();
    let { data: animal } = useGetAnimal({ animalId: (animalId as unknown) as number });
    let photos = [];
    if (animal && animal.thumbnail) {
        const base64 = Buffer.from(animal.thumbnail.buffer).toString('base64');
        photos.push(base64);
        console.log(base64);
        console.log(animal.thumbnail.buffer);
    }
    return (
        <Grid container spacing={3} alignItems="stretch">
            <Grid item xs={12} sm={8}>
                <Slider
                    photos={[
                        'https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
                        ...photos,
                    ]}
                />
                <AnimalInfoDescription animalId={(animalId as unknown) as number} />
            </Grid>
            <Grid item xs={12} sm={4}>
                <AnimalInfoCard animalId={(animalId as unknown) as number} />
            </Grid>
        </Grid>
    );
};

export default AnimalInfo;
