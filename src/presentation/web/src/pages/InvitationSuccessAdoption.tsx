import { makeStyles, Paper, Theme } from '@material-ui/core';
import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AppCtx } from '../App';
import { useGetAllAdoptionSteps, useGetAnimalSubmission } from '../client';
import AdoptionStepper from '../components/common/stepper/AdoptionStepper';
import Invitation from '../components/invitationForSignAgreement/Invitation';
import LoadingCircle from '../components/loadingCircle/LoadingCircle';
import useQuery from '../utils/UseQuery';

const useStyle = makeStyles((theme: Theme) => ({
    paper: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem 0'
    },
}))

interface StepperWrapperProps {
    animalId: number;
}

const StepperWrapper: React.FC<StepperWrapperProps> = ({ animalId }) => {
    const classes = useStyle();
    const requestOptions = { headers: { access_token: localStorage.getItem('apiKey') ?? '' } };

    const { location } = useHistory();
    const { data: adoptionStepsData, loading: adoptionStepsLoading } = useGetAllAdoptionSteps({ animalId, requestOptions });

    const currentStep = parseInt(location.pathname.split('/').slice(-1).join(''));
    return <>{
        !adoptionStepsLoading && adoptionStepsData 
        ?
            <>
                <AdoptionStepper adoptionSteps={adoptionStepsData.map((step) => step.name)} currentStep={currentStep} />
            </>
        :
            <LoadingCircle />
        }
    </>  
}

const InvitationForSignAgreementPage: React.FC = () => {
    const requestOptions = { headers: { access_token: localStorage.getItem('apiKey') ?? '' } };

    const classes = useStyle();
    const { appState } = useContext(AppCtx);
    const { data: submissionData, loading: submissionLoading } = useGetAnimalSubmission({ userId: appState.userId!, requestOptions });

    return (
        <Paper className={classes.paper}>
            {!submissionLoading && submissionData 
                ? 
                    <>
                        <StepperWrapper animalId={submissionData.animal.id} />
                        <Invitation />
                    </>
                :
                    <LoadingCircle />
            }
        </Paper>
    );
};

export default InvitationForSignAgreementPage;