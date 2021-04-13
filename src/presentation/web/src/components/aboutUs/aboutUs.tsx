import React from "react";
import { makeStyles } from '@material-ui/styles';
import theme from '../../themes/theme';
import { Grid, Typography } from "@material-ui/core";
import GridContainer from "../gridContainer/GridContainer";

const useStyles = makeStyles({
    mainWrapper: {
        backgroundColor: theme.palette.background.paper,
    },
});

const AboutUs: React.FC = () => {
    const classes = useStyles();
    return (
        <GridContainer spacing={2} align="center" justify="center">
            <Grid container item xs={12} className={classes.mainWrapper}>
                <Typography>Hi</Typography>
            </Grid>
        </ GridContainer>
    );
};

export default AboutUs;