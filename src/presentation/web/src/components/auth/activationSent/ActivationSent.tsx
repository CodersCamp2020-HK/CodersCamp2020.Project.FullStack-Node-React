import { Avatar, Grid, Link, Paper, Theme, Typography, useTheme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { FaEnvelopeOpenText } from 'react-icons/fa';
import { Link as RouterLink } from 'react-router-dom';

const useStyle = makeStyles((theme: Theme) => ({
    greenBackground: {
        backgroundColor: theme.palette.secondary.dark,
        width: '200px',
        height: '200px',
        marginBottom: theme.spacing(1),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    message: {
        textAlign: 'center',
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3),
    },
    returnToLogin: {
        marginTop: theme.spacing(1),
        color: theme.palette.info.dark,
    },
    icon: {
        fontSize: 72,
    },
}));

const ActivationSent = () => {
    const theme = useTheme();
    const classes = useStyle();
    return (
        <Grid spacing={0} container direction="column" item xs={4}>
            <Grid item xs>
                <Paper className={classes.paper} variant="outlined" square={false}>
                    <Avatar variant="circular" className={classes.greenBackground}>
                        <FaEnvelopeOpenText size="100" color={theme.palette.secondary.contrastText} />
                    </Avatar>
                    <Typography className={classes.message} variant="body1">
                        Sprawdź swoją skrzynkę mailową.
                    </Typography>
                    <Typography className={classes.message} variant="body1">
                    Mail z linkiem aktywacyjnym powinien zostać dostarczony w
                        przeciągu kilku minut.
                    </Typography>
                    <Link component={RouterLink} className={classes.returnToLogin} to="/auth">
                        <Typography variant="body2">Wróć do logowania</Typography>
                    </Link>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default ActivationSent;
