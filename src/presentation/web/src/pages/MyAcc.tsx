import React, { useContext } from 'react';
import GridContainer from '../components/gridContainer/GridContainer';
import { AppCtx } from '../App';
import Grid from '@material-ui/core/Grid';
import SideNavList from '../components/navbar/sideNav/SideNav';
import { Switch, useRouteMatch } from 'react-router-dom';
import ProtectedRoute from '../components/protectedRoute/ProtectedRoute';
import Volunteer from './Volunteer';
import Volunteers from './Volunteers';
import Users from './Users';
import Animals from './Animals';
import Applications from './Applications';
import Profile from './Profile';
import Calendar from './Calendar';
import LoginForm from '../components/auth/loginForm/LoginForm';
import { makeStyles } from '@material-ui/core/styles';
import Step from './Step';

const useStyles = makeStyles({
    wrapper: {
        minHeight: 'inherit',
    },
});

const MyAcc = () => {
    const classes = useStyles();
    const { path } = useRouteMatch();
    const { appState } = useContext(AppCtx);
    const { role, userName } = appState;
    return (
        <GridContainer marginBottom={50} marginTop={50} spacing={2} align="flex-start" justify="center">
            <Grid item xs={12} sm="auto">
                <SideNavList role={role!} name={userName!} />
            </Grid>
            <Grid container alignItems="flex-start" justify="center" item xs={12} sm className={classes.wrapper}>
                <Switch>
                    <ProtectedRoute path={`${path}/adoption/step`} component={Step} />
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
