import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import FirstStep from '../components/firstStep/FirstStep';
import PageAdopt from '../components/pageAdopt/PageAdopt';
import GridContainer from '../components/gridContainer/GridContainer';

const Adoption = () => {
    const { path } = useRouteMatch();

    return (
        <Switch>
            <Route exact path={`${path}/step/1`}>
                <FirstStep />
            </Route>
            <Route exact path={`${path}`}>
                <PageAdopt />;
            </Route>
        </Switch>
    );
};

export default Adoption;
