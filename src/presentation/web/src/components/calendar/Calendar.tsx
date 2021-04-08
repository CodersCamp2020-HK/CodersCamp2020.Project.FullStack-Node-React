import { Calendar as MuiCalendar, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { addDays } from 'date-fns'
import plLocale from 'date-fns/locale/pl';
import React from 'react';

const Calendar = () => {
    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={plLocale}>
            <MuiCalendar disablePast minDate={new Date()} maxDate={addDays(new Date(), 14)} date={new Date()} onChange={(date) => {
                console.log(date);
            }} />
        </MuiPickersUtilsProvider>
    )
};

export default Calendar;