import React, { useContext } from 'react';
import { useGetForm } from '../../client';
import useQuery from '../../utils/UseQuery';
import { useHistory } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import AdoptionApplicationFirstStep, { Inputs } from '../adoptionApplicationFirstStep/AdoptionApplicationFirstStep';
import { AppCtx } from '../../App';
import SideNav from '../navbar/sideNav/SideNav';

const FirstStep = () => {
    const { appState } = useContext(AppCtx);
    const { role, userName } = appState;
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
        <>
            <Grid item lg={3}>
                <SideNav role={role!} name={userName!}/>
            </Grid>
            <Grid item lg>
                <AdoptionApplicationFirstStep description={data?.description} title={data?.name} handleSubmit={handleIdSubmit}>
                </AdoptionApplicationFirstStep>
            </Grid>
        </>
    )
}

export default FirstStep
