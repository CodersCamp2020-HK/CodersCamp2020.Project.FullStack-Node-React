import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import ChangePassword from '../components/changePassword/ChangePassword';
import ForgetPassword from '../components/forgetPassword/ForgetPassword';
import LoginForm from '../components/loginForm/LoginForm';
import NotFound from './NotFound';

const Auth = () => {
    const { path } = useRouteMatch();
    return (
        <Switch>
            <Route exact path={`${path}/forget`} component={ForgetPassword} />
            <Route exact path={`${path}/change`} component={ChangePassword} />
            <Route exact path={path} component={LoginForm} />
            <Route path='*' component={NotFound} />
        </Switch>
    )
}

export default Auth
