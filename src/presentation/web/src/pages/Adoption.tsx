import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { AppCtx } from '../App';
import FirstStep from '../components/firstStep/FirstStep';
import PageAdopt from '../components/pageAdopt/PageAdopt';
import GridContainer from '../components/gridContainer/GridContainer';
import CongratulationPage from '../components/congratulationPage/CongratulationPage';
import ProtectedRoute from '../components/protectedRoute/ProtectedRoute';
import { Grid } from '@material-ui/core';
import SideNavList from '../components/navbar/sideNav/SideNav';

const Adoption = () => {
    const { path } = useRouteMatch();

    return (
        <GridContainer justify="center" align="flex-start" spacing={2}>
            <Switch>
                <Route exact path={`${path}/step/1`}>
                    <FirstStep />
                </Route>
                <Route exact path={`${path}`}>
                    <PageAdopt />;
                </Route>
            </Switch>
        </GridContainer>
    );
};

export default Adoption;
