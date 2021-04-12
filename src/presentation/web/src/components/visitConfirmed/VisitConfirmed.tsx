import React from 'react';
import Calendar from '../../components/calendar/Calendar';
import { Typography } from '@material-ui/core';
import { Event } from '@material-ui/icons';
import { format } from 'date-fns';

interface VisitConfirmedProps {
    date: Date;
    adopter: string;
    worker: string;
}

const VisitConfirmed = ({date, adopter, worker}: VisitConfirmedProps) => {
    return (
        <div >
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