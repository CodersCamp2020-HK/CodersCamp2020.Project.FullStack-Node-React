import { Grid, makeStyles, Paper, Theme } from '@material-ui/core';
import React from 'react';
import { useGetAllAdoptionSteps } from '../client';
import AdoptionStepper from '../components/common/stepper/AdoptionStepper';
import Invitation from '../components/invitationForSignAgreement/Invitation';

interface Props{
    animalId: number,
    currentStep: number,
}

const useStyle = makeStyles((theme: Theme) => ({
    mainWrapper: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem 0'
    },
}))

const invitationForSignAgreementPage: React.FC<Props> = ( {animalId, currentStep}) => {
    const { data: adoptionStepsData } = useGetAllAdoptionSteps({ animalId: animalId, requestOptions: { headers: { access_token: localStorage.getItem('apiKey') ?? '' } } });
    const classes = useStyle();

    if (adoptionStepsData) {
        return (
            <Grid item sm>
                <Paper className={classes.mainWrapper} variant='outlined'>
                    <AdoptionStepper adoptionSteps={adoptionStepsData.map((step) => step.name)} currentStep={currentStep} />
                    <Invitation />
                </Paper>
            </Grid>
        )
    }
}

export default invitationForSignAgreementPage;