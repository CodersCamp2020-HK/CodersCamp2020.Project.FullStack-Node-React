import React from 'react';
import { makeStyles, Typography, Link, Grid, Button } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import PhotoLanding from './img/Landing-hero.jpg';
import AnimationPaws from '../animationPaws/AnimationPaws';
import Hidden from '@material-ui/core/Hidden';
import { Container } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    photoLanding: {
        height: 'calc(100vh - 70px)',
        position: 'relative',
        '&:before': {
            position: 'absolute',
            content: '""',
            top: 0,
            left: 0,
            height: '100%',
            width: '100%',
            backgroundImage: `url(${PhotoLanding})`,
            backgroundPosition: 'top',
            backgroundSize: 'cover',
            zIndex: -1,
            opacity: 0.8,
        },
    },
    container: {
        height: '100%',
        display: 'flex',
        alignItems: 'center',
    },
    button: {
        background: theme.palette.secondary.dark,
    },
    link: {
        marginTop: 30,
    },
    header: {
        color: theme.palette.secondary.dark,
        maxWidth: 370,
        fontWeight: 'bold',
    },
}));

const LandingHero = () => {
    const classes = useStyles();
    return (
        <div className={classes.photoLanding}>
            <Container className={classes.container}>
                <Grid container>
                    <Grid item xs={2}>
                        <Hidden xsDown>
                            <AnimationPaws />
                        </Hidden>
                    </Grid>
                    <Grid container item xs={12} sm={8} justify="center" alignItems="center" direction="column">
                        <Typography variant={'h3'} color="secondary" align="center" className={classes.header}>
                            Jak adoptować zwierzaka?
                        </Typography>

                        <Link component={RouterLink} to="/adoption" className={classes.link}>
                            <Button color="secondary" variant="contained" type="submit" className={classes.button}>
                                O procesie adopcyjnym
                            </Button>
                        </Link>
                    </Grid>
                    <Grid item xs={2}>
                        <Hidden xsDown>
                            <AnimationPaws />
                        </Hidden>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};

export default LandingHero;
