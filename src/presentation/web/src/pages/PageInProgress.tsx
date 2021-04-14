import { Typography } from '@material-ui/core';
import React from 'react';
import UnderConstruction from '../assets/under-construction.jpg';
import GridContainer from '../components/gridContainer/GridContainer';

const PageInProgress = () => {
    return (
        <GridContainer marginBottom={0} marginTop={0} spacing={2} align="center" justify="center">
            <img alt="Work in progress" src={UnderConstruction} />
            <Typography variant="h1">Strona w budowie! Zajrzyj później :)</Typography>
        </GridContainer>
    );
};

export default PageInProgress;
