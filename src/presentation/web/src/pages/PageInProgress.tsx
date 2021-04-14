import GridContainer from '../components/gridContainer/GridContainer';
import React from 'react';
import { Typography } from '@material-ui/core';

const PageInProgress = () => {
    return (
        <GridContainer marginBottom={0} marginTop={0} spacing={2} align="center" justify="center">
            <img alt='Work in progress' src={} />
            <Typography variant='h1'>Strona w budowie! Zajrzyj później :)</Typography>
        </GridContainer>
    )
}

export default PageInProgress;

