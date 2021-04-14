import React from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    wrapper: {
        textAlign: 'center',
        margin: '100px 0px',
    },
});

const NotFoundResults = () => {
    const classes = useStyles();
    return (
        <div className={classes.wrapper}>
            <Typography variant="h5">Przepraszamy, nie znaleziono żadnych wyników wyszukiwania.</Typography>
        </div>
    );
};

export default NotFoundResults;
