import React, { useContext } from 'react';
import GridContainer from '../components/gridContainer/GridContainer';
import { AppCtx } from '../App';
import Grid from '@material-ui/core/Grid';
import SideNavList from '../components/sideNav/SideNavList';

const MyAcc = () => {
    const { appState } = useContext(AppCtx);
    const { role, userName, userId } = appState;
    return (
        <GridContainer spacing={2} align="flex-start" justify="center">
            <Grid item xs={3}>
                <SideNavList role={role!} name={userName!} />
            </Grid>
            <Grid item xs={9}>
                elo
            </Grid>
        </GridContainer>
    );
};

export default MyAcc;
