import React from 'react';
import { useLocation } from 'react-router-dom';
import Page404 from '../components/page404/Page404'

const NotFound = () => {
    let location = useLocation();

    return (
        <Page404 />
    )
};

export default NotFound;
