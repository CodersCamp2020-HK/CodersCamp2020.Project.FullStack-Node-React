import React from 'react';
import FilterPanel from '../components/filterPanel/FilterPanel';
import LandingHero from '../components/landingHero/LandingHero';

const Home = () => {
    return (
        <div>
            <LandingHero />
            <FilterPanel />
        </div>
    );
};

export default Home;
