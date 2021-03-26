import React from 'react';
import CallOutlinedIcon from '@material-ui/icons/CallOutlined';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import AlternateEmailOutlinedIcon from '@material-ui/icons/AlternateEmailOutlined';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import { makeStyles } from '@material-ui/styles';
import theme from "../../themes/theme";
import Grid from '@material-ui/core/Grid';
import mapPhoto from "./img/map.jpg";
import shelterPhoto from "./img/hand.jpg";
import SvgIcon from '@material-ui/icons/CallOutlined';
import { Container, Typography } from '@material-ui/core';
import { FullscreenExitTwoTone } from '@material-ui/icons';

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
        marginTop: '8%',
        marginBottom: '5%',
    },
    iconContainer: {
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 'rounded-full',
        alignItems: 'center',
    },
    lockBackground: {
        backgroundColor: theme.palette.secondary.dark,
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
    shelterPhoto: {
        borderRadius: '15px',
        width: '70%',
    },
    mapPhoto: {
        display: 'flex',
        border: '0',
        frameBoarder: '0',
        allowfullscreen: '0',
        allowFullScreen: '',
        tabindex: '0',
        margin: 'auto',
        padding: 0,
        width: 600,
        height: 450,
        loading: "lazy",
    },
});

const ContactPage: React.FC = () => {
    const classes = useStyles();
    return (
        <Grid container spacing={3} className={classes.root}>
            <Grid item xs={12} sm={6} className={classes.iconContainer}>
                <div className={classes.lockBackground}>
                    <CallOutlinedIcon className={classes.lockIcon} />
                </div>
                <Typography>diusahidusa</Typography>
                <div className={classes.lockBackground}>
                    <LocationOnOutlinedIcon className={classes.lockIcon} />
                </div>
                <Typography>diusahidusa</Typography>
                <div className={classes.lockBackground}>
                    <AlternateEmailOutlinedIcon className={classes.lockIcon} />
                </div>
                <Typography>diusahidusa</Typography>
                <div className={classes.lockBackground}>
                    <PersonOutlineOutlinedIcon className={classes.lockIcon} />
                </div>
                <Typography>diusahidusa</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
                <img src={shelterPhoto} alt="shelter photo" className={classes.shelterPhoto} />
            </Grid>
            <Grid item xs={12}>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5147.8280012549485!2d17.02881503620837!3d51.18886271981003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470febdae76d444f%3A0x173c5b990e04fcc2!2zUHNhcnkgNTEtMTgwLCBHxYLDs3duYSA1MGM!5e0!3m2!1spl!2spl!4v1616777981166!5m2!1spl!2spl" className={classes.mapPhoto} aria-hidden="false"></iframe>
            </Grid>
        </Grid>
    );
};

export default ContactPage;