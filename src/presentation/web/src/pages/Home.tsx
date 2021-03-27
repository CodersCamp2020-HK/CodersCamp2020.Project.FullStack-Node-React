import React from 'react';
import { Route, Switch } from 'react-router-dom';
import NotFound from './NotFound';

const Home = () => {
    return (
        <Switch>
            <Route exact path="/">
                <div>
                    Home page
                </div>
            </Route>
            <Route path="*" component={NotFound} />
        </Switch>
    );
};

export default Home;
