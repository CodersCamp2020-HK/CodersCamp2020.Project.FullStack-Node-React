import { Chip, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { useState } from 'react';

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

interface SelectedTime {
    id: number,
    value: string,
}

const TimePicker = ({ times }: TimePickerProps) => {
    const [selected, setSelected] = useState<SelectedTime>(null!)
    const styles = useStyles();
    return (
        <div className={styles.wrapper}>
            {times.map((time, index) => (
                <Chip key={index} className={styles.chip} size='medium' label={time} variant="outlined" color="secondary" />
            ))}
        </div>
    );
};

export default TimePicker;
