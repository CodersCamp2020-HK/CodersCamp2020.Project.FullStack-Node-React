import DateFnsUtils from '@date-io/date-fns';
import { Calendar as MuiCalendar, Day, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { addDays, isToday, isSameDay } from 'date-fns';
import plLocale from 'date-fns/locale/pl';
import React, { useState } from 'react';

const Calendar = () => {
    const [selectedDate, setSelectedDate] = useState<Date>(null!);
    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={plLocale}>
            <MuiCalendar
                disablePast
                minDate={new Date()}
                maxDate={addDays(new Date(), 14)}
                date={new Date()}
                onChange={(date: MaterialUiPickersDate) => {
                    setSelectedDate(date as Date);
                }}
                renderDay={(day, selectedCalendarDate, dayInCurrentMonth) => {
                    const isTodayDay = isToday(day as Date);
                    const isSelected = isSameDay(day as Date, selectedDate);
                    const markedDay = (
                        <Day selected={isSelected} current={isTodayDay}>
                            {day?.getDate()}
                        </Day>
                    );
                    return markedDay;
                }}
            />
        </MuiPickersUtilsProvider>
    );
};

export default Calendar;
