import DateFnsUtils from '@date-io/date-fns';
import { makeStyles, Paper, Theme } from '@material-ui/core';
import { Calendar as MuiCalendar, Day, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { addDays, isSameDay, isToday, isWithinInterval, startOfDay, startOfToday } from 'date-fns';
import plLocale from 'date-fns/locale/pl';
import React, { useState } from 'react';

const useStyles = makeStyles((theme: Theme) => ({
    todayDate: {
        '& button': {
            border: '1px solid',
            borderRadius: '50%',
            borderColor: theme.palette.secondary.main,
        },
    },
    paper: {
        padding: theme.spacing(2),

        '& .MuiPickersCalendarHeader-daysHeader': {
            borderBottom: '1px solid rgba(0, 0, 0, 0.38)',
            borderTop: '1px solid rgba(0, 0, 0, 0.38);',
            paddingBottom: theme.spacing(1),
            paddingTop: theme.spacing(1),
            justifyContent: 'space-between',
        },

        '& .MuiPickersDay-current': {
            color: theme.palette.secondary.main,
        },

        '& .MuiPickersDay-daySelected': {
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.common.white
        },
    },
    week: {
        justifyContent: 'space-between',
    }
}));

interface CalendarProps {
    getSelectedDate: (date: Date) => any;
}

const Calendar = ({ getSelectedDate }: CalendarProps) => {
    const styles = useStyles();
    const [selectedDate, setSelectedDate] = useState<Date>(null!);
    return (
        <Paper className={styles.paper}>
            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={plLocale}>
                <MuiCalendar
                classes={{week: styles.week}}
                    disablePast
                    minDate={new Date()}
                    maxDate={addDays(new Date(), 14)}
                    date={startOfToday()}
                    onChange={(date: MaterialUiPickersDate) => {
                        setSelectedDate(date as Date);
                        getSelectedDate(date as Date);
                    }}
                    renderDay={(day, selectedCalendarDate, dayInCurrentMonth) => {
                        const isTodayDay = isToday(day as Date);
                        const isSelected = isSameDay(day as Date, selectedDate);
                        const isDisabledDate = !isWithinInterval(startOfDay(day as Date), {
                            start: startOfToday(),
                            end: addDays(startOfToday(), 14),
                        });
                        const markedDay = (
                            <div className={isTodayDay ? styles.todayDate : undefined}>
                                <Day disabled={isDisabledDate} selected={isSelected} current={isTodayDay}>
                                    {day?.getDate()}
                                </Day>
                            </div>
                        );
                        return markedDay;
                    }}
                />
            </MuiPickersUtilsProvider>
        </Paper>
    );
};

export default Calendar;
