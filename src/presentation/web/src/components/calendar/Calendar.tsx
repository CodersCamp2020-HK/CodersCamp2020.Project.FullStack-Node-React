import { Calendar as MuiCalendar, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import React from 'react';

const Calendar = () => {
    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <MuiCalendar date={new Date()} onChange={(date) => {
                console.log(date);
            }} />
        </MuiPickersUtilsProvider>
    )
};

export default Calendar;