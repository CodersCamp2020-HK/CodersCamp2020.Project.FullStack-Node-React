import React, { useContext } from 'react'
import { Redirect } from 'react-router-dom';
import { AppCtx } from '../../App'
import { useGetUserSteps } from '../../client'
import LinearProgress from '@material-ui/core/LinearProgress';

const CheckAdoptionStep = () => {
    const { appState } = useContext(AppCtx);
    const requestOptions = { headers: { access_token: localStorage.getItem('apiKey') ?? '' } };
    const { data, loading } = useGetUserSteps({ userId: appState.userId!, requestOptions })
    console.log(data);

    if (!loading && data) {
        return <Redirect to={`step/${data.adoptionStep}`} />
    }
    return <LinearProgress color="secondary" />
}

export default CheckAdoptionStep
