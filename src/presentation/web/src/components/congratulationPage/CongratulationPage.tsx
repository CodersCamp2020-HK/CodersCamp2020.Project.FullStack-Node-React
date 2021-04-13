import { LinearProgress, makeStyles } from '@material-ui/core';
import React from 'react'
import { useGetAnimal } from '../../client';
import CongratulationSite from "../congratulationSite/CongratulationSite";

const CongratulationPage = () => {
    const { data, loading, error } = useGetAnimal({ animalId: 1, requestOptions: { headers: { access_token: localStorage.getItem('apiKey') ?? '' } } });
    if (!loading && data) {
        return (
            <CongratulationSite name={data.name} photoURL={Buffer.from(data.thumbnail.buffer, 'binary').toString('base64')} />
        )
    }
    return (
        <LinearProgress />
    )
};

export default CongratulationPage;