import React from 'react';
import { useGetForm } from '../../client/index';
import Form from './Form';

const AnimalForm = () => {
    const form = useGetForm({ animalId: 1, requestOptions: { headers: { access_token: '' }} });

    if (form.data && form.data.form) {
        return <Form questions={form.data.form.questions}/>
    }
    return <></>
}

export default AnimalForm
