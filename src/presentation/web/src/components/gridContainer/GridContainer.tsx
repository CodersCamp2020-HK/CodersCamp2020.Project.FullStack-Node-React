import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Container, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    container: {
        minHeight: 'calc(100vh - 70px - 4rem)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

const GridContainer: React.FC = (props: any) => {
    const classes = useStyles();
    return (
        <Container className={classes.container}>
            <Grid container justify="center" alignItems="center">
                {props.children}
            </Grid>
        </Container>
    );
};

export default GridContainer;
