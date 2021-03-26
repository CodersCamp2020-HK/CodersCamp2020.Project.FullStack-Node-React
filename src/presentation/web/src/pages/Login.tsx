import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ChangePassword from '../components/changePassword/ChangePassword';
import ForgetPassword from '../components/forgetPassword/ForgetPassword';
import LoginForm from '../components/loginForm/LoginForm';

const Login = () => {
    return (
        <>
            <Route exact path="/login" component={LoginForm} />
            <Route exact path="/login/forget" component={ForgetPassword} />
            <Route exact path="/login/change" component={ChangePassword} />
        </>
    )
}

export default Login
