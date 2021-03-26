import React from 'react';
import Container from '@material-ui/core/Container';
import CallOutlinedIcon from '@material-ui/icons/CallOutlined';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import AlternateEmailOutlinedIcon from '@material-ui/icons/AlternateEmailOutlined';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import { makeStyles } from '@material-ui/styles';
import theme from "../../themes/theme";
import Grid from '@material-ui/core/Grid';
import mapPhoto from "./img/map.jpg";
import shelterPhoto from "./img/hand.jpg";

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
    },
    infoContainer: {
    },
    shelterPhoto: {
        width: '70%',
        height: '90%',
    },
    mapPhoto: {
        display: 'block',
        margin: 'auto',
        width: '71%',
    },
    iconStyles: {
        display: 'inline-block',
        background: theme.palette.secondary.dark,
        borderRadius: 'rounded-full',
    }
});

const ContactPage = () => {
    const classes = useStyles();
    let iconStyles = { color: "white", fontSize: "1.5em" };
    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6} className={classes.infoContainer}>
                    <CallOutlinedIcon />
                    <LocationOnOutlinedIcon />
                    <AlternateEmailOutlinedIcon />
                    <PersonOutlineOutlinedIcon />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <img src={shelterPhoto} alt="shelter photo" className={classes.shelterPhoto} />
                </Grid>
                <Grid item xs={12}>
                    <img src={mapPhoto} alt="map photo" className={classes.mapPhoto} />
                </Grid>
            </Grid>
        </div>
    );
};

export default ContactPage;