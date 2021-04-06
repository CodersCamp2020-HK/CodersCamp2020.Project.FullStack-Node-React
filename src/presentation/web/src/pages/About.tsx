import React from 'react';
import { BrowserRouter as Router, Route, Link, useLocation } from 'react-router-dom';

const About = () => {
    let location = useLocation();
    console.log(location);
    return <div>O nas</div>;
};

export default About;
