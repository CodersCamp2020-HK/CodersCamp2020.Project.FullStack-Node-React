import React from 'react';
import { Switch, useRouteMatch } from 'react-router-dom';
import ProtectedRoute from '../components/protectedRoute/ProtectedRoute';
import CheckAdoptionStep from '../components/checkAdoptionStep/CheckAdoptionStep';
import FirstStep from '../components/firstStep/FirstStep';
import InvitationForSignAgreementPage from './InvitationSuccessAdoption';
import FormProcessing from '../components/formsProcessing/formProcessing';

const Step = () => {
    const { path } = useRouteMatch();

    return (
        <Switch>
            <ProtectedRoute exact path={`${path}/4`} component={InvitationForSignAgreementPage} />
            <ProtectedRoute exact path={`${path}/2`} component={FormProcessing} />
            <ProtectedRoute exact path={`${path}/1`} component={FirstStep} />
            <ProtectedRoute exact path={`${path}`} component={CheckAdoptionStep} />
        </Switch>
    );
}

export default Step
