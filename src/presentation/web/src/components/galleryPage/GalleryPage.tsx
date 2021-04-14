import React from 'react';
import { useGetAnimals, GetAnimalsQueryParams } from '../../client/index';
import AnimalCard from '../animalCard/AnimalCard';
import { Grid } from '@material-ui/core';

type GalleryType = 1 | 2 | 3;

interface Props {
    query: GetAnimalsQueryParams;
    currentPage: number;
    galleryType: GalleryType;
}

const GalleryPage: React.FC<Props> = ({ query, currentPage, galleryType }) => {
    const { data } = useGetAnimals({ queryParams: { ...query, page: currentPage, perPage: 6 } });
    console.log(data);
    return (
        <Grid container spacing={3}>
            {data instanceof Array &&
                data.map((item) => (
                    <Grid item xs={12} sm={6} md={4} key={item.id}>
                        <AnimalCard
                            admissionToShelter={item.additionalInfo.admissionToShelter}
                            galleryType={galleryType}
                            id={item.id}
                            name={item.name}
                            description={item.description}
                            photoURL={Buffer.from(item.thumbnail.buffer, 'binary').toString('base64')}
                        />
                    </Grid>
                ))}
        </Grid>
    );
};

export default React.memo(GalleryPage);
