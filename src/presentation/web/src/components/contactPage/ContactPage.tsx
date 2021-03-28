import React from 'react';
import CallOutlinedIcon from '@material-ui/icons/CallOutlined';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import AlternateEmailOutlinedIcon from '@material-ui/icons/AlternateEmailOutlined';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import { makeStyles } from '@material-ui/styles';
import theme from "../../themes/theme";
import Grid from '@material-ui/core/Grid';
import shelterPhoto from "./img/hand.jpg";
import { createMuiTheme, Paper, Typography } from '@material-ui/core';

const themes = createMuiTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 800,
            lg: 1000,
            xl: 1280,
        },
    },
});

const useStyles = makeStyles({
    root: {
        flexGrow: 0,
        flexShrink: 0,
        marginBottom: '5%',
        marginTop: '15%',
    },
    iconContainer: {
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 'rounded-full',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.palette.background.paper,
        paddingTop: '6%',
        paddingBottom: '6%',
    },
    lockBackground: {
        backgroundColor: theme.palette.secondary.dark,
        marginTop: '2%',
        marginBottom: '2%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '50%',
        width: 40,
        height: 40,
    },
    lockIcon: {
        color: '#FFF',
        opacity: .87,
    },
    test: {
        height: '100%',
        width: '100%',
        backgroundImage: `url(${shelterPhoto})`,
        backgroundPosition: 'center top',
        backgroundSize: 'cover',
        borderRadius: '15px',
        padding: 0,
        ustify: 'center',
    },
    shelterContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        minHeight: '414px',
        [themes.breakpoints.down('xs')]: {
            marginTop: '5%',
            alignItems: 'center',
            justifyContent: 'center',
        },
    },
    mapPhoto: {
        display: 'flex',
        border: '0',
        frameBoarder: '0',
        allowfullscreen: '0',
        tabindex: '0',
        margin: 'auto',
        marginTop: '5%',
        width: '100%',
        height: '600px',
        loading: "lazy",
    },
});

const ContactPage: React.FC = () => {
    const classes = useStyles();
    return (
        <Grid container className={classes.root}>
            <Grid item xs={12} sm={6}>
                <Paper variant="outlined" className={classes.iconContainer}>
                    <div className={classes.lockBackground}>
                        <CallOutlinedIcon className={classes.lockIcon} />
                    </div>
                    <Typography variant={'subtitle2'}>Telefon:</Typography>
                    <Typography variant={'subtitle2'}>111-222-333</Typography>
                    <div className={classes.lockBackground}>
                        <LocationOnOutlinedIcon className={classes.lockIcon} />
                    </div>
                    <Typography variant={'subtitle2'}>Adres:</Typography>
                    <Typography variant={'subtitle2'}>ul.Główna 50c</Typography>
                    <Typography variant={'subtitle2'}>51-180 Psary</Typography>
                    <div className={classes.lockBackground}>
                        <AlternateEmailOutlinedIcon className={classes.lockIcon} />
                    </div>
                    <Typography variant={'subtitle2'}>E-mail:</Typography>
                    <Typography variant={'subtitle2'}>schronisko@schronisko-zlapki.com</Typography>
                    <div className={classes.lockBackground}>
                        <PersonOutlineOutlinedIcon className={classes.lockIcon} />
                    </div>
                    <Typography variant={'subtitle2'}>Dyrektor: Mateusz Kaczmarek</Typography>
                    <Typography variant={'subtitle2'}>Główny weterynarz: Andrzej Śliwowski</Typography>
                    <Typography variant={'subtitle2'}>Administracja: Grażyna Kowal</Typography>
                </Paper>
            </Grid>
            <Grid item xs={12} sm={6} className={classes.shelterContainer} >
                <div className={classes.test}></div>
            </Grid>
            <Grid item xs={12}>
                <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d20004.80284408307!2d17.0311458676758!3d51.189588443602666!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x173c5b990e04fcc2!2zUHNhcnkgNTEtMTgwLCBHxYLDs3duYSA1MGM!5e0!3m2!1spl!2spl!4v1616853103897!5m2!1spl!2spl" className={classes.mapPhoto} aria-hidden="false"></iframe>
            </Grid>
        </Grid >
    );
};

export default ContactPage;