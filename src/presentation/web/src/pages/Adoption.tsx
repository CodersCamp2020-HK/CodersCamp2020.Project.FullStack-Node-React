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
        <GridContainer marginBottom={0} marginTop={0} spacing={2} align="center" justify="center">
            <Switch>
                <Route exact path={`${path}`}>
                    <PageAdopt />;
                </Route>
            </Switch>
        </GridContainer>
    );
};

export default Adoption;
