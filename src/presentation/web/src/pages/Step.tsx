import React, { useContext } from 'react';
import GridContainer from '../components/gridContainer/GridContainer';
import { AppCtx } from '../App';
import Grid from '@material-ui/core/Grid';
import SideNavList from '../components/navbar/sideNav/SideNav';
import { Switch, useRouteMatch } from 'react-router-dom';
import ProtectedRoute from '../components/protectedRoute/ProtectedRoute';
import CheckAdoptionStep from '../components/checkAdoptionStep/CheckAdoptionStep';
import FirstStep from '../components/firstStep/FirstStep';
import InvitationForSignAgreementPage from './InvitationSuccessAdoption';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    wrapper: {
        minHeight: 'inherit',
    },
});

const Step = () => {
    const classes = useStyles();
    const { path } = useRouteMatch();
    const { appState } = useContext(AppCtx);
    const { role, userName } = appState;

    return (
        <Switch>
            <ProtectedRoute exact path={`${path}/4`} component={InvitationForSignAgreementPage} />
            <ProtectedRoute exact path={`${path}/1`} component={FirstStep} />
            <ProtectedRoute exact path={`${path}`} component={CheckAdoptionStep} />
        </Switch>
    );
}

export default Step
