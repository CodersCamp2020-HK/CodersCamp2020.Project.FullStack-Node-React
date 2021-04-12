import React, { useContext } from 'react';
import GridContainer from '../components/gridContainer/GridContainer';
import { AppCtx } from '../App';
import Grid from '@material-ui/core/Grid';
import SideNavList from '../components/sideNav/SideNavList';
import { Switch, useRouteMatch, Route } from 'react-router-dom';
import ProtectedRoute from '../components/protectedRoute/ProtectedRoute';
import Volunteer from './Volunteer';
import Volunteers from './Volunteers';
import Users from './Users';
import Animals from './Animals';
import Applications from './Applications';
import Profile from './Profile';
import Calendar from './Calendar';
import LoginForm from '../components/auth/loginForm/LoginForm';

const MyAcc = () => {
    const { path } = useRouteMatch();
    const { appState } = useContext(AppCtx);
    const { role, userName, userId } = appState;
    return (
        <GridContainer spacing={2} align="flex-start" justify="center">
            <Grid item xs={3}>
                <SideNavList role={role!} name={userName!} />
            </Grid>
            <Grid item xs={9}>
                <Switch>
                    <ProtectedRoute exact path={`${path}/volunteer`} component={Volunteer} />
                    <ProtectedRoute exact path={`${path}/volunteers`} component={Volunteers} />
                    <ProtectedRoute exact path={`${path}/users`} component={Users} />
                    <ProtectedRoute exact path={`${path}/animals`} component={Animals} />
                    <ProtectedRoute exact path={`${path}/applications`} component={Applications} />
                    <ProtectedRoute exact path={`${path}/profile`} component={Profile} />
                    <ProtectedRoute exact path={`${path}/calendar`} component={Calendar} />
                    <ProtectedRoute exact path={`${path}`} component={LoginForm} />
                </Switch>
            </Grid>
        </GridContainer>
    );
};

export default MyAcc;
