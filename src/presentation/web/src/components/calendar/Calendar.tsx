import DateFnsUtils from '@date-io/date-fns';
import { Calendar as MuiCalendar, Day, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import plLocale from 'date-fns/locale/pl';
import React, { useState } from 'react';
import { addDays, isSameDay, isToday, isWithinInterval, set, startOfDay, startOfToday } from 'date-fns';

const Calendar = () => {
    const [selectedDate, setSelectedDate] = useState<Date>(null!);
    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={plLocale}>
            <MuiCalendar
                disablePast
                minDate={new Date()}
                maxDate={addDays(new Date(), 14)}
                date={startOfToday()}
                onChange={(date: MaterialUiPickersDate) => {
                    setSelectedDate(date as Date);
                }}
                renderDay={(day, selectedCalendarDate, dayInCurrentMonth) => {
                    const isTodayDay = isToday(day as Date);
                    const isSelected = isSameDay(day as Date, selectedDate);
                    const isDisabledDate = !isWithinInterval(startOfDay(day as Date), {
                        start: startOfToday(),
                        end: addDays(startOfToday(), 14),
                    });
                    const markedDay = (
                        <Day disabled={isDisabledDate} selected={isSelected} current={isTodayDay}>
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
