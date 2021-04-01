import React from 'react';
import { useGetForm } from '../../client/index';
import Form from './Form';

const AnimalForm = () => {
    const { data } = useGetForm({ animalId: 1, requestOptions: { headers: { access_token: '' }} });

    if (data && data.form) {
        return <Form questions={data.form.questions}/>
    }
    return <></>
}

export default AnimalForm
