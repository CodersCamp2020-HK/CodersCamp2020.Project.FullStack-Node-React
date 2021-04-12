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
    }
}))

const VisitConfirmed = ({date, adopter, worker}: VisitConfirmedProps) => {
    const styles = useStyles();
    return (
        <div className={styles.wrapper}>
            <Event />
            <Typography variant='h5'>Wizyta w schronisku potwierdzona</Typography>
            <Typography variant='h6'>Data spotkania w schronisku dla {adopter} potwierdzona na: </Typography>
            <Typography variant='h6'>{format(date, 'dd/MM/yyyy, HH:mm')}</Typography>
            <Typography variant='h6'>Pracownik akceptujący wniosek adopcyjny:</Typography>
            <Typography variant='h6'>{worker}</Typography>
            <Calendar getSelectedDate={() => null} name='calendar' />
        </div>
    )
}

export default VisitConfirmed;