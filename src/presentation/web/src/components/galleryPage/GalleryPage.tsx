import React from 'react';
import { useGetAnimals, GetAnimalsQueryParams } from '../../client/index';
import AnimalCard from '../animalCard/AnimalCard';
import { Grid } from '@material-ui/core';

interface Props {
    query: GetAnimalsQueryParams;
    currentPage: number;
}

const GalleryPage: React.FC<Props> = ({ query, currentPage }) => {
    const { data } = useGetAnimals({ queryParams: { ...query, page: currentPage, perPage: 6 } });
    return (
        <Grid container spacing={3}>
            {data instanceof Array &&
                data.map((item) => (
                    <Grid item xs={12} sm={6} md={4} key={item.id}>
                        <AnimalCard
                            name={item.name}
                            description={item.description}
                            photoURL={Buffer.from(item.thumbnail.buffer.data, 'binary').toString('base64')}
                        />
                    </Grid>
                ))}
        </Grid>
    );
};

export default React.memo(GalleryPage);
