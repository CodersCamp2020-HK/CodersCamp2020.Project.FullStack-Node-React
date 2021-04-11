import { Link, makeStyles, Paper, Theme, Typography } from '@material-ui/core';
import { CalendarToday } from '@material-ui/icons';
import { Link as RouterLink } from 'react-router-dom';
import React from 'react';

const useStyle = makeStyles<Theme>((theme) => ({
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
}));

const ConfirmedVisitDate = ({ date }: { date: Date }) => {
    const styles = useStyle();

    return (
        <div>
            <Paper className={styles.paper} variant="outlined" square={false}>
                <CalendarToday />
                <Typography className={styles.text} variant="h5">
                    Data spotkania
                </Typography>
                <Typography variant="h6">{`Ustaliłeś(aś) datę spotkania w schronisku na: ${date.toISOString()}`}</Typography>
            </Paper>
            <Typography variant="subtitle1">
                Przychodząc do nas zarezerwuj sobie kilka godzin na oglądanie i poznanie naszych zwierzęcia. Nie śpiesz
                się – adopcja to często decyzja na najbliższych kilkanaście lat.
            </Typography>
            <Typography variant="body2">
                W razie chęci przełożenia daty spotkania prosimy o kontakt telefoniczny bezpośrednio ze schroniskiem.
            </Typography>
            <Typography variant="body1">Jak do nas dotrzeć?</Typography>
            <Link href="/contact" component={RouterLink} to="/contact">
                <Typography variant="body1">Zobacz na mapie</Typography>
            </Link>
        </div>
    );
};

export default ConfirmedVisitDate;