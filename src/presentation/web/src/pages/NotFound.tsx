import React from 'react';
import { useLocation } from 'react-router-dom';

const NotFound = () => {
    let location = useLocation();

    return (
        <div>
            404 - Not Found - {location.pathname}
        </div>
    );
};

export default NotFound;
