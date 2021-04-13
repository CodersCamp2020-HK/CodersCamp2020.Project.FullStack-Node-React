import { Grid, makeStyles, Paper, Theme } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { useGetAllAdoptionSteps } from '../client';
import AdoptionStepper from '../components/common/stepper/AdoptionStepper';
import Invitation from '../components/invitationForSignAgreement/Invitation';
import LoadingCircle from '../components/loadingCircle/LoadingCircle';
import useQuery from '../utils/UseQuery';

const useStyle = makeStyles((theme: Theme) => ({
    mainWrapper: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem 0'
    },
}))

const InvitationForSignAgreementPage: React.FC = () => {
    const id = useQuery().get('id');
    const { location } = useHistory();
    const currentStep = parseInt(location.pathname.split('/').slice(-1).join(''));
    console.log(id);
    console.log(currentStep);
    const { data: adoptionStepsData } = useGetAllAdoptionSteps({ animalId: parseInt(id!), requestOptions: { headers: { access_token: localStorage.getItem('apiKey') ?? '' } } });
    const classes = useStyle();

        return <>{!adoptionStepsData ?  <LoadingCircle /> : (
            <Paper className={classes.mainWrapper} variant='outlined'>
                <AdoptionStepper adoptionSteps={adoptionStepsData.map((step) => step.name)} currentStep={currentStep} />
                <Invitation />
            </Paper>
        )}</>;    
};

export default InvitationForSignAgreementPage;