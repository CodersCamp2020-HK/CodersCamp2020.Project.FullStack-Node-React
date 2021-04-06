import React, { useContext } from 'react';
import { useGet } from 'restful-react';
import { useGetAnimals, GetAnimalsQueryParams } from '../../client/index';
import { BrowserRouter as Router, Link, useLocation, useParams, useRouteMatch } from 'react-router-dom';
import AnimalCard from '../animalCard/AnimalCard';

interface Props {
    query: GetAnimalsQueryParams;
    currentPage: number;
}

const GalleryPage: React.FC<Props> = ({ query, currentPage }) => {
    console.log('render galery page');
    console.log(`currentPage: ${currentPage}`);
    console.log(query);
    const { data, loading } = useGetAnimals({ queryParams: { ...query, page: currentPage, perPage: 6 } });
    console.log(data);
    const url = 'https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260';
    return (
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {data instanceof Array &&
                data.map((item) => (
                    <AnimalCard key={item.id} name={item.name} description={item.description} photoURL={url} />
                ))}
        </div>
    );
};

export default React.memo(GalleryPage);
