import React, { useContext, useEffect } from 'react';
import { useHistory, Redirect, useLocation } from 'react-router-dom';
import { AppCtx } from '../App';

const Logout = () => {
    const { setAppState } = useContext(AppCtx);
    let history = useHistory();
    localStorage.removeItem('apiKey');
    useEffect(() => {
        setAppState({
            role: null,
            userId: null,
            userName: null,
        });
        history.push('/');
    }, []);

    return <div>logout</div>;
};

export default Logout;
