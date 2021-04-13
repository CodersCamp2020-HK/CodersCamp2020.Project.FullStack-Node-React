import React from 'react';
import { makeStyles } from '@material-ui/styles';
import DoneOutline from '@material-ui/icons/DoneOutline';
import { Card, CardActionArea, CardMedia, Grid, Link, Paper, SvgIcon, Typography } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import theme from '../../themes/theme';

const useStyles = makeStyles({
    mainWrapper: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem 0'
    },
    descriptionLine: {
        fontWeight: 'bold',
        fontFamily: 'Roboto',
        fontSize: '20px',
        lineHeight: '32px',
        letterSpacing: '0.15px',
    },
    margin: {
        marginTop: '1rem',
    },
    iconWrapper: {
        marginTop: '1rem',
        backgroundColor: theme.palette.secondary.dark,
        borderRadius: 90,
        padding: 8,
    },
    icon: {
        color: '#FFF',
        opacity: 0.87,
    },
    media: {
        height: 300,
        width: 400,
    },
    link: {
        color: theme.palette.info.dark,
    },
});

interface Props {
    photoURL: string,
    name: string,
}

const CongratulationSite: React.FC<Props> = ({ photoURL, name }) => {
    const classes = useStyles();
    console.log(photoURL);
    return (
        <Grid item xs={12} md={6}>
            <Paper
                className={classes.mainWrapper}
                variant="outlined">
                <Typography variant="h4">
                    Adoptowałeś!
                </Typography>
                <SvgIcon className={classes.iconWrapper}>
                    <DoneOutline className={classes.icon} />
                </SvgIcon>
                <Typography variant="h5" className={classes.margin}>
                    Gratulacje!
                </Typography>
                <Card className={classes.margin}>
                    <CardActionArea>
                        <CardMedia
                            className={classes.media}
                            image={`data:image/png;base64,${photoURL}`}
                            title="Adoptuj mnie"
                        />
                    </CardActionArea>
                </Card>
                <Typography className={classes.margin} variant="subtitle1">
                    <span className={classes.descriptionLine}>{name}</span> znalazł/a swój nowy dom dzięki Tobie.
                </Typography>
                <Link component={RouterLink} to={`/contact`} className={`${classes.link} ${classes.margin}`}>
                    W razie jakichkolwiek pytań skontaktuj się z nami
                </Link>
            </Paper>
        </Grid>
    )
};

export default CongratulationSite;