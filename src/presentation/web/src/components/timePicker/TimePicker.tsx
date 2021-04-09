import { Chip, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { useState } from 'react';

interface TimePickerProps {
    times: string[];
    getSelectedTime: (time: string) => any;
}

interface SelectedTime {
    id: number;
    value: string;
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

const TimePicker = ({ times, getSelectedTime }: TimePickerProps) => {
    const [selected, setSelected] = useState<SelectedTime>(null!);
    const styles = useStyles();

    const handleChange = ({ id, value }: SelectedTime) => {
        setSelected({ id, value });
        getSelectedTime(value);
    };

    return (
        <div className={styles.wrapper}>
            {times.map((time, index) => (
                <Chip
                    key={index}
                    className={styles.chip}
                    size="medium"
                    label={time}
                    variant={selected && index === selected.id ? 'default' : 'outlined'}
                    color="secondary"
                    onClick={() => handleChange({ id: index, value: time })}
                />
            ))}
        </div>
    );
};

export default TimePicker;
