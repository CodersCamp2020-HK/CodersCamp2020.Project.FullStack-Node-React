import React from 'react';
import { Button, Paper, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import theme from '../../themes/theme';

const useStyles = makeStyles({
    mainPaper: {
        variant: "outlined",
        backgroundColor: theme.palette.background.paper,
    },
    mainHeader: {
        textAlign: 'center',
    },
    normalText: {

    },
    buttonIcon: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: theme.palette.primary.main,
    },
});

const AdoptionApplicationFirstStep: React.FC = (children, title, description) => {
    const classes = useStyles();
    return (
        <Paper
            className={classes.mainPaper}
            variant="outlined">
            <Typography
                className={classes.mainHeader}
                variant="h4">
                {title}
            </Typography>
            {children}
            <Typography
                className={classes.normalText}
                variant="body1">
                {description}
            </Typography>
            <Typography
                className={classes.normalText}
                variant="subtitle1">
                Wpisz numer ewidencyjny zwierzęcia
                </Typography>
            <TextField
                variant="outlined"
                size="medium"
                color="secondary"
                label="Nr ewidencyjny">
            </TextField>
            <Button
                className={classes.buttonIcon}
                variant="contained"
                size="large"
                color="primary" >SPRAWDŹ</Button>
        </Paper>
    )
}

export default AdoptionApplicationFirstStep;