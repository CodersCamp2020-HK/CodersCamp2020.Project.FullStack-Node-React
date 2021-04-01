import React from 'react';
import { useGetForm } from '../../client/index';
import Form from './Form';

const AnimalForm = () => {
    const form = useGetForm({ animalId: 1, requestOptions: { headers: { access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJpZCI6MSwiaWF0IjoxNjE3MjkwNDkxfQ.tyfJuo4lnPrZ3Jub_oiKKPw5T0BXa1hBiy3ndpSIoJY' }} });

    if (form.data && form.data.form) {
        return <Form questions={form.data.form.questions}/>
    }
    return <></>
}

export default AnimalForm
