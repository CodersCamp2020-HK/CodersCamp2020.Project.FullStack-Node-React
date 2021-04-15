import react from 'react';
import { makeStyles } from '@material-ui/styles';
import { Link, Grid, Paper, Typography } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import CalendarTodayOutlinedIcon from '@material-ui/icons/CalendarTodayOutlined';
import theme from '../../themes/theme';
import React from 'react';
import { useGetAnimalSubmission } from "../../client";
import LoadingCircle from '../loadingCircle/LoadingCircle';
import formatDate from '../../utils/formatText/formatDate';

const useStyles = makeStyles({
    mainWrapper: {
        width: '100%',
        padding: '2rem 2rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    insideWrapper: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: '1rem',
    },
    dateWrapper: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '1rem 5rem',
    },
    iconWrapper: {
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
    icon: {
        color: '#FFF',
        opacity: 0.87,
    },
    link: {
        color: theme.palette.info.dark,
    },
    margin: {
        marginTop: 24,
    },
    footer: {
        display: 'inline-block',
    },
});

const MeetDateConfirmed: React.FC = () => {
    const classes = useStyles();
    const requestOptions = { headers: { access_token: localStorage.getItem('apiKey') ?? '' } };
    const { data, loading, error } = useGetAnimalSubmission({ userId: 2, requestOptions });
    if (error) console.error(error);
    if (data) console.log(data);
    return <>
        {data && !loading
            ?
            <Paper className={`${classes.mainWrapper} ${classes.margin}}`} variant="outlined">
                <Typography className={classes.margin} variant='h4'>Adoptuj zwierzaka!</Typography>
                <div className={`${classes.insideWrapper} ${classes.margin}`}>
                    <Paper className={classes.dateWrapper} variant="outlined">
                        <div className={classes.iconWrapper}>
                            <CalendarTodayOutlinedIcon className={classes.icon} />
                        </div>
                        <Typography variant='h5'>Data spotkania</Typography>
                        <Typography className={classes.margin} variant='subtitle1'>Ustaliłeś(aś) datę spotkania w schronisku na:</Typography>
                        <Typography variant='h6'>{formatDate(data.submissionDate)}</Typography>
                    </Paper>
                </div>
                <Typography className={classes.margin} variant='subtitle1'>Przychodząc do nas zarezerwuj sobie kilka godzin na oglądanie i poznanie naszych zwierzęt.</Typography>
                <Typography variant='subtitle1'>Nie śpiesz się – adopcja to często decyzja na najbliższych kilkanaście lat.</Typography>
                <Typography className={classes.margin} variant='body2'>W razie chęci przełożenia daty spotkania prosimy o kontakt telefoniczny bezpośrednio ze schroniskiem.</Typography>
                <div className={classes.footer}>
                    <Typography className={classes.margin} variant='body1'>Jak do nas dotrzeć? <Link component={RouterLink} to={`/contact`} className={classes.link} variant='body2'>
                        Zobacz na mapie.
                            </Link></Typography>
                </div>
            </Paper>
            :
            <LoadingCircle />
        }
    </>
};

export default MeetDateConfirmed;


