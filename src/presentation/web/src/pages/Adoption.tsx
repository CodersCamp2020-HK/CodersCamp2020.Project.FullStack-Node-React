import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import PageAdopt from '../components/pageAdopt/PageAdopt';
import GridContainer from '../components/gridContainer/GridContainer';
import InvitationForSignAgreementPage from './InvitationSuccessAdoption';
import ProtectedRoute from '../components/protectedRoute/ProtectedRoute';
import FirstStep from '../components/firstStep/FirstStep';

const Adoption = () => {
    const { path } = useRouteMatch();

    return (
        <GridContainer justify="center" align="flex-start" spacing={2}>
            <Switch>
                    <ProtectedRoute exact path={`${path}/step/4`} component={InvitationForSignAgreementPage} />
                <Route exact path={`${path}`}>
                    <PageAdopt />;
                </Route>
            </Switch>
        </GridContainer>
    );
};

export default Adoption;
