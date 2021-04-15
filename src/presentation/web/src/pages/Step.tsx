import React, { useState } from 'react';
import { Switch, useRouteMatch } from 'react-router-dom';
import ProtectedRoute from '../components/protectedRoute/ProtectedRoute';
import CheckAdoptionStep from '../components/checkAdoptionStep/CheckAdoptionStep';
import FirstStep from '../components/firstStep/FirstStep';
import InvitationForSignAgreementPage from './InvitationSuccessAdoption';
import FormProcessing from '../components/formsProcessing/formProcessing';

interface IStepState {
    currentStep: number;
    adoptionSteps: string[];
}

interface StepStateContextInterface {
    stepState: IStepState;
    setStepState: React.Dispatch<React.SetStateAction<IStepState>>;
}

const initialContext = {
    stepState: {
        currentStep: 1,
        adoptionSteps: [],
    },
    setStepState: () => {},
};

export const StepCtx = React.createContext<StepStateContextInterface>(initialContext);

const initialStepState: IStepState ={
    currentStep: 1,
    adoptionSteps: []
} 

const Step = () => {
    const { path } = useRouteMatch();
    const [stepState, setStepState] = useState<IStepState>(initialStepState);

    return (
        <StepCtx.Provider value={{ stepState, setStepState }}>
            <Switch>
                <ProtectedRoute exact path={`${path}/4`} component={InvitationForSignAgreementPage} />
                <ProtectedRoute exact path={`${path}/2`} component={FormProcessing} />
                <ProtectedRoute exact path={`${path}/1`} component={FirstStep} />
                <ProtectedRoute exact path={`${path}`} component={CheckAdoptionStep} />
            </Switch>
        </StepCtx.Provider>
    );
}

export default Step
