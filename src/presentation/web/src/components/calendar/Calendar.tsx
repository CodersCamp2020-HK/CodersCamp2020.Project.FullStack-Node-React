import DateFnsUtils from '@date-io/date-fns';
import { makeStyles, Paper, Theme } from '@material-ui/core';
import { Calendar as MuiCalendar, Day, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { addDays, endOfDay, isSameDay, isToday, isWithinInterval, startOfDay, startOfToday } from 'date-fns';
import plLocale from 'date-fns/locale/pl';
import React, { useState } from 'react';

interface CalendarProps {
    readOnly?: boolean;
    defaultSelected?: Date;
    getSelectedDate?: (date: Date) => any;
    name: string;
}

const useStyles = makeStyles((theme: Theme) => ({
    todayDate: {
        '& button': {
            border: '1px solid',
            borderRadius: '50%',
            borderColor: theme.palette.secondary.main,
        },
    },
    paper: {
        width: '60%',

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
            color: theme.palette.common.white,
        },
    },
    week: {
        justifyContent: 'space-between',
    },
}));

const Calendar = ({ getSelectedDate, defaultSelected, readOnly }: CalendarProps) => {
    const styles = useStyles();
    const [selectedDate, setSelectedDate] = useState<Date>(defaultSelected!);

    const beginningOfToday = startOfToday();
    const beginningOfTwoWeeksLaterDay = addDays(startOfToday(), 14);
    const endOfTwoWeeksLaterDay = endOfDay(addDays(startOfToday(), 14));

    return (
        <Paper className={styles.paper}>
            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={plLocale}>
                <MuiCalendar
                    classes={{ week: styles.week }}
                    disablePast
                    minDate={beginningOfToday}
                    maxDate={endOfTwoWeeksLaterDay}
                    date={beginningOfToday}
                    onChange={(date: MaterialUiPickersDate) => {
                        if (readOnly) {
                            return;
                        }
                        setSelectedDate(date as Date);
                        if (getSelectedDate) {
                            getSelectedDate(date as Date);
                        }
                    }}
                    renderDay={(day) => {
                        const beginningOfDay = startOfDay(day as Date);
                        const isTodayDay = isToday(day as Date);
                        const isSelected = isSameDay(day as Date, selectedDate);
                        const isDisabledDate = !isWithinInterval(beginningOfDay, {
                            start: beginningOfToday,
                            end: beginningOfTwoWeeksLaterDay,
                        });
                        const dayComponent = (
                            <div className={isTodayDay ? styles.todayDate : undefined}>
                                <Day disabled={isDisabledDate} selected={isSelected} current={isTodayDay}>
                                    {day && day.getDate()}
                                </Day>
                            </div>
                        );
                        return dayComponent;
                    }}
                />
            </MuiPickersUtilsProvider>
        </Paper>
    );
};

export default Calendar;
