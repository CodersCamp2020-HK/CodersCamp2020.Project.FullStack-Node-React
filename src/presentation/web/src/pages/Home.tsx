import React from 'react';
import { Route, Switch } from 'react-router-dom';
import NotFound from './NotFound';
import FilterPanel from '../components/filterPanel/FilterPanel';

const Home = () => {
    return (
        <Switch>
            <Route exact path="/" component={FilterPanel} />
            <Route path="*" component={NotFound} />
        </Switch>
    )
}

export default Home;
