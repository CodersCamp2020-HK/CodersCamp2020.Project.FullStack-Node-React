import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import PageAdopt from '../components/pageAdopt/PageAdopt';
import GridContainer from '../components/gridContainer/GridContainer';

const Adoption = () => {
    const { path } = useRouteMatch();

    return (
        <GridContainer justify="center" align="flex-start" spacing={2}>
            <Switch>
                <Route exact path={`${path}`}>
                    <PageAdopt />;
                </Route>
            </Switch>
        </GridContainer>
    );
};

export default Adoption;
