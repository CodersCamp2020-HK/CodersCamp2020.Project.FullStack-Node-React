import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import FirstStep from '../components/firstStep/FirstStep';
import PageAdopt from '../components/pageAdopt/PageAdopt';
import GridContainer from '../components/gridContainer/GridContainer';
import invitationForSignAgreementPage from './InvitationSuccessAdoption';
import ProtectedRoute from '../components/protectedRoute/ProtectedRoute';

const Adoption = () => {
    const { path } = useRouteMatch();

    return (
        <GridContainer justify="center" align="flex-start" spacing={2}>
            <Switch>
                <Route exact path={`${path}/step/1`}>
                    <FirstStep />
                </Route>
                    <ProtectedRoute exact path={`${path}/step/4`} component={invitationForSignAgreementPage} />
                <Route exact path={`${path}`}>
                    <PageAdopt />;
                </Route>
            </Switch>
        </GridContainer>
    );
};

export default Adoption;
