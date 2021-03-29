import React, { useContext } from 'react';
import Pagination from '@material-ui/lab/Pagination';
import { SubmitContext } from '../../pages/Home';
import { useGet } from 'restful-react';
import AnimalCard from '../animalCard/AnimalCard';
import { GetAnimals } from '../../client/index';

const Gallery = () => {
    console.log('render gallery');
    const { animal } = useContext(SubmitContext);
    const animalReq =
        animal === 'catDog'
            ? { path: '/animals' }
            : {
                  path: '/animals',
                  queryParams: {
                      specie: animal,
                  },
              };

    const { data, loading } = useGet(animalReq);

    console.log(data);

    return (
        <div>
            {!loading &&
                data.map(({ id, name, description }: any) => (
                    <AnimalCard
                        key={id}
                        name={name}
                        description={description}
                        photoURL="https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                    />
                ))}
            <Pagination color="primary" count={5} />
        </div>
    );
};

export default React.memo(Gallery);
