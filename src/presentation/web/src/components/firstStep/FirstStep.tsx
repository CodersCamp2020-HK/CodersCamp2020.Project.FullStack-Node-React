import React from 'react';
import { useGetForm } from '../../client';
import useQuery from '../../utils/UseQuery';
import AdoptionApplicationFirstStep, { Inputs } from '../adoptionApplicationFirstStep/AdoptionApplicationFirstStep';
import { useHistory } from "react-router-dom";

const FirstStep = () => {
    const history = useHistory();
    const id = useQuery().get('id');
    const animalId = id ? parseInt(id) : 1;
    const { data, refetch } = useGetForm({ animalId, lazy: !id, requestOptions: { headers: { access_token: localStorage.getItem('apiKey') ?? '' } } });
    const handleIdSubmit = async ({ numerEwidencyjny: id }: Inputs) => {
        try {
            refetch({ pathParams: { animalId: id } })
            history.push(`?id=${id}`);
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            {/* <span>{JSON.stringify(data)}</span> */}
            <AdoptionApplicationFirstStep description={data?.description} title={data?.name} handleSubmit={handleIdSubmit}>
            </AdoptionApplicationFirstStep>
        </div>
    )
}

export default FirstStep
