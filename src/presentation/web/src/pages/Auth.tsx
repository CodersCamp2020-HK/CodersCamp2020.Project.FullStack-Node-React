import React from 'react';
import { Route, Switch, useRouteMatch, Redirect } from 'react-router-dom';
import ChangePassword from '../components/auth/changePassword/ChangePassword';
import ForgetPassword from '../components/auth/forgetPassword/ForgetPassword';
import LoginForm from '../components/auth/loginForm/LoginForm';
import RegisterPage from '../components/auth/registerPage/RegisterPage';
import ActivationSent from '../components/auth/activationSent/ActivationSent';

const Auth: React.FC = () => {
    const { path } = useRouteMatch();

    return (
        <Switch>
            <Route exact path={`${path}/sent`} component={ActivationSent} />
            <Route exact path={`${path}/register`} component={RegisterPage} />
            <Route exact path={`${path}/forget`} component={ForgetPassword} />
            <Route exact path={`${path}/change`} component={ChangePassword} />
            <Route exact path={path} component={LoginForm} />
            <Redirect to={`/404/${path}`} />
        </Switch>
    )
}

export default Auth
