import { Chip, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React from 'react';

interface TimePickerProps {
    times: string[];
}

const useStyles = makeStyles((theme: Theme) => ({
    wrapper: {
        display: 'flex',
        justifyContent: 'center',
    },
    chip: {
        marginRight: theme.spacing(1),
    },
}));

const TimePicker = ({ times }: TimePickerProps) => {
    const styles = useStyles();
    return (
        <div className={styles.wrapper}>
            {times.map((time) => (
                <Chip className={styles.chip} size='medium' label={time} variant="outlined" color="secondary" />
            ))}
        </div>
    );
};

export default TimePicker;
