import { Link, makeStyles, Paper, Theme, Typography } from '@material-ui/core';
import { CalendarToday } from '@material-ui/icons';
import { format } from 'date-fns';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

const useStyle = makeStyles<Theme>((theme) => ({
    wrapper: {
        textAlign: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        margin: '3rem 0',
        padding: '20px 50px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    text: {
        color: theme.palette.text.primary,
        marginBottom: 35,
    },
    linkWrapper: {
        display: 'flex',
        justifyContent: 'center',
    },
    locationInfo: {
        marginRight: theme.spacing(1),
    },
    link: {
        color: theme.palette.info.main,
    },
    description: {
        marginBottom: theme.spacing(1),
    }
}));

const ConfirmedVisitDate = ({ date }: { date: Date }) => {
    const styles = useStyle();

    const formattedDate = format(date, 'dd/MM/yyyy, HH:mm');

    return (
        <div className={styles.wrapper}>
            <Paper className={styles.paper} variant="outlined" square={false}>
                <CalendarToday />
                <Typography className={styles.text} variant="h5">
                    Data spotkania
                </Typography>
                <Typography variant="h6">Ustaliłeś(aś) datę spotkania w schronisku na:</Typography>
                <Typography variant="h6">{formattedDate}</Typography>
            </Paper>
            <Typography className={styles.description} variant="subtitle1">
                Przychodząc do nas zarezerwuj sobie kilka godzin na oglądanie i poznanie naszych zwierzęcia. Nie śpiesz
                się – adopcja to często decyzja na najbliższych kilkanaście lat.
            </Typography>
            <Typography className={styles.description} variant="body2">
                W razie chęci przełożenia daty spotkania prosimy o kontakt telefoniczny bezpośrednio ze schroniskiem.
            </Typography>
            <div className={styles.linkWrapper}>
                <Typography className={styles.locationInfo} variant="body1">
                    Jak do nas dotrzeć?
                </Typography>
                <Link href="/contact" component={RouterLink} to="/contact">
                    <Typography className={styles.link} variant="body1">
                        Zobacz na mapie
                    </Typography>
                </Link>
            </div>
        </div>
    );
};

export default ConfirmedVisitDate;
