import { Avatar, Grid, Link, Paper, Theme, Typography } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/styles';
import { FaEnvelopeOpenText } from 'react-icons/fa';
import { Link as RouterLink } from 'react-router-dom'

const ActivationSent = () => {
    const theme = useTheme<Theme>();
    const useStyle = makeStyles({
        greenBackground: {
            backgroundColor: theme.palette.secondary.dark,
        },
        paper: {
            padding: theme.spacing(2),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        returnToLogin: {
            color: theme.palette.info.dark,
        },
    });
    const classes = useStyle();  
    return (
        <Grid spacing={0} container direction="column" item xs={4}>
            <Grid item xs>
                <Paper className={classes.paper} variant="outlined" square={false}>
                    <Avatar variant="circular" className={classes.greenBackground}>
                        <FaEnvelopeOpenText color={theme.palette.secondary.contrastText} />
                    </Avatar>
                    <Typography variant='body1'>
                    Sprawdź swoją skrzynkę mailową. Mail z linkiem aktywacyjnym powienien zostać dostarczony w przeciągu kilku minut.
                    </Typography>
                    <Link component={RouterLink} className={classes.returnToLogin} to="/login">
                        <Typography variant="body2">Wróć do logowania</Typography>
                    </Link>
                </Paper>
            </Grid>
        </Grid>
    )
}

export default ActivationSent;