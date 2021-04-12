import React, { useEffect } from 'react';
import { useGetForm } from '../../client';
import useQuery from '../../utils/UseQuery';
import AdoptionApplicationFirstStep, { Inputs } from '../adoptionApplicationFirstStep/AdoptionApplicationFirstStep';

const FirstStep = () => {
    const id = useQuery().get('id');
    const animalId = id ? parseInt(id) : 1;
    console.log()
    const { data, refetch } = useGetForm({ animalId, lazy: !id, requestOptions: { headers: { access_token: localStorage.getItem('apiKey') ?? '' } } });
    const handleIdSubmit = async ({ numerEwidencyjny: id }: Inputs) => {
        try {
            refetch({ pathParams: { animalId: id } })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <span>{JSON.stringify(data, null, 4)}</span>
            <AdoptionApplicationFirstStep handleSubmit={handleIdSubmit}>
            </AdoptionApplicationFirstStep>
        </div>
    )
}

export default FirstStep
