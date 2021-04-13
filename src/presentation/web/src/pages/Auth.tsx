import React from 'react';
import { Route, Switch, useRouteMatch, Redirect } from 'react-router-dom';
import ChangePassword from '../components/auth/changePassword/ChangePassword';
import ForgetPassword from '../components/auth/forgetPassword/ForgetPassword';
import LoginForm from '../components/auth/loginForm/LoginForm';
import RegisterPage from '../components/auth/registerPage/RegisterPage';
import ActivationSent from '../components/auth/activationSent/ActivationSent';
import GridContainer from '../components/gridContainer/GridContainer';
import ProtectedRoute from '../components/protectedRoute/ProtectedRoute';
import ResetPassword from '../components/auth/resetPassword/ResetPassword';
import Logout from './Logout';

const Auth: React.FC = () => {
    const { path } = useRouteMatch();

    return (
        <GridContainer spacing={2} align="center" justify="center">
            <Switch>
                <Route exact path={`${path}/link`} component={ActivationSent} />
                <Route exact path={`${path}/register`} component={RegisterPage} />
                <Route exact path={`${path}/forget`} component={ForgetPassword} />
                <Route exact path={`${path}/change`} component={ChangePassword} />
                <Route exact path={`${path}/reset/:uuid`} component={ResetPassword} />
                <ProtectedRoute exact path={`${path}/logout`} component={Logout} />
                <Route exact path={path} component={LoginForm} />
                <Redirect to={`/404/${path}`} />
            </Switch>
        </GridContainer>
    );
};

export default Auth;
