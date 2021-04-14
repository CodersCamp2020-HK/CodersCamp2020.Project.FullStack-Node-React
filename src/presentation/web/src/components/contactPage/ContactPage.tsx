import React from 'react';
import CallOutlinedIcon from '@material-ui/icons/CallOutlined';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import AlternateEmailOutlinedIcon from '@material-ui/icons/AlternateEmailOutlined';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import { makeStyles } from '@material-ui/styles';
import theme from '../../themes/theme';
import Grid from '@material-ui/core/Grid';
import shelterPhoto from './img/jpg1.jpg';
import { createMuiTheme, Paper, Typography } from '@material-ui/core';
import GridContainer from '../../components/gridContainer/GridContainer';

const themes = createMuiTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 800,
            lg: 1000,
            xl: 1275,
        },
    },
});

const useStyles = makeStyles({
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
        opacity: 0.87,
    },
    catWrapper: {
        [themes.breakpoints.down('sm')]: {
            padding: '24px 0',
        },
        [themes.breakpoints.up('sm')]: {
            padding: '0 0 0 24px',
        },
    },
    catPhoto: {
        width: '100%',
        height: 500,
        backgroundImage: `url(${shelterPhoto})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        borderRadius: 15,
    },
    info: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: theme.palette.background.paper,
        height: 500,
        borderRadius: 15,
        border: '1px solid #eee',
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
        loading: 'lazy',
        [themes.breakpoints.down('xl')]: {
            marginBottom: '5%',
        },
    },
    wrapper: {
        marginTop: 20,
    },
});
const ContactPage: React.FC = () => {
    const classes = useStyles();
    return (
        <GridContainer marginBottom={0} marginTop={0} spacing={2} align="center" justify="center">
            <Grid container item xs={12} className={classes.wrapper}>
                <Grid item xs={12} sm={6} className={classes.info}>
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
                </Grid>
                <Grid item xs={12} sm={6} className={classes.catWrapper}>
                    <div className={classes.catPhoto}></div>
                </Grid>
                <Grid item xs={12}>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d20004.80284408307!2d17.0311458676758!3d51.189588443602666!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x173c5b990e04fcc2!2zUHNhcnkgNTEtMTgwLCBHxYLDs3duYSA1MGM!5e0!3m2!1spl!2spl!4v1616853103897!5m2!1spl!2spl"
                        className={classes.mapPhoto}
                        aria-hidden="false"
                    ></iframe>
                </Grid>
            </Grid>
        </GridContainer>
    );
};

export default ContactPage;
