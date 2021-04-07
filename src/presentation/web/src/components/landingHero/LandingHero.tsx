import React from 'react';
import { makeStyles, Typography, Link, Grid, Button } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import PhotoLanding from './img/Landing-hero.jpg';
import AnimationPaws from '../animationPaws/AnimationPaws';
import Hidden from '@material-ui/core/Hidden';
import { Container } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    photoLanding: {
        backgroundImage: `url(${PhotoLanding})`,
        backgroundPosition: 'top',
        backgroundSize: 'cover',
        height: 'calc(100vh - 70px)',
    },
    container: {
        height: '100%',
        display: 'flex',
        alignItems: 'center',
    },
    button: {
        marginTop: theme.spacing(4),
        background: theme.palette.secondary.dark,
    },
    link: {
        width: '70%',
    },
    header: {
        color: theme.palette.secondary.dark,
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
                    <Grid container item xs={12} sm={8} justify="center" alignItems="center">
                        <Typography variant={'h3'} color="secondary" align="center" className={classes.header}>
                            Jak adoptować
                        </Typography>
                        <Typography variant={'h3'} color="secondary" align="center" className={classes.header}>
                            zwierzaka?
                        </Typography>
                        <Link component={RouterLink} to="/adoption" className={classes.link}>
                            <Button
                                color="secondary"
                                variant="contained"
                                type="submit"
                                className={classes.button}
                                fullWidth={true}
                            >
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
