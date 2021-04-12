import { makeStyles, Theme, Typography } from '@material-ui/core';
import { Event } from '@material-ui/icons';
import { format } from 'date-fns';
import React from 'react';
import Calendar from '../../components/calendar/Calendar';

interface VisitConfirmedProps {
    date: Date;
    adopter: string;
    worker: string;
}

const useStyles = makeStyles((theme: Theme) => ({
    wrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    icon: {
        marginBottom: theme.spacing(3),
    },
    title: {
        marginBottom: theme.spacing(3),
    },
    contentSection: {
        marginBottom: theme.spacing(5),
    },
}));

const VisitConfirmed = ({ date, adopter, worker }: VisitConfirmedProps) => {
    const styles = useStyles();
    return (
        <div className={styles.wrapper}>
            <Event className={styles.icon} />
            <Typography className={styles.title} variant="h5">
                Wizyta w schronisku potwierdzona
            </Typography>
            <Typography variant="h6">Data spotkania w schronisku dla {adopter} potwierdzona na: </Typography>
            <Typography className={styles.contentSection} variant="h6">
                {format(date, 'dd/MM/yyyy, HH:mm')}
            </Typography>
            <Typography variant="h6">Pracownik akceptujący wniosek adopcyjny:</Typography>
            <Typography variant="h6">{worker}</Typography>
            <Calendar readOnly defaultSelected={date} name="calendar" />
        </div>
    );
};

export default VisitConfirmed;
