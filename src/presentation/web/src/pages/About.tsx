import React from 'react';
import { Route, useRouteMatch } from 'react-router-dom';
import AboutUs from "../components/aboutUs/aboutUs";

const About = () => {
    const { path } = useRouteMatch();
    return (
        <Route exact path={`${path}/aboutus`}>
            <AboutUs />
        </Route>
    );
};

export default About;
