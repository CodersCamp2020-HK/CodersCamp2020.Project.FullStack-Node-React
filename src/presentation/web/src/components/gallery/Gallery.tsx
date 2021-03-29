import React, { useContext } from 'react';
import Pagination from '@material-ui/lab/Pagination';
import { useGet } from 'restful-react';
import { FormContex } from '../../pages/Home';

const Gallery = () => {
    const { formState, setFormState } = useContext(FormContex);

    const { data } = useGet({
        path: 'animals',
        queryParams: {
            specie: 'dog',
        },
    });

    return (
        <div>
            <Pagination color="primary" count={5} />
        </div>
    );
};

export default Gallery;
