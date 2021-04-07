import { Calendar as MuiCalendar } from '@material-ui/pickers';
import React from 'react';

const Calendar = () => {
    return (
        <MuiCalendar date={new Date()} onChange={(date) => {
            console.log(date);
        }} />
    )
};

export default Calendar;