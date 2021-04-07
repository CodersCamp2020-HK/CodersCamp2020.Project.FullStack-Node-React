import React from 'react';
import { Route, Switch } from 'react-router-dom';
import FilterPanel from '../components/filterPanel/FilterPanel';
import LandingHero from '../components/landingHero/LandingHero';

const Home = () => {
    return (
        <Switch>
            <Route exact path="/" render={() => {
                return (
                    <div>
                        <LandingHero />
                        <FilterPanel />
                    </div>
                )
            }} />
        </Switch>
    )
}

export default Home;
