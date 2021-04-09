import React from 'react';
import { Chip, Theme} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

interface TimePickerProps {
    times: string[];
}

const TimePicker = ({times}: TimePickerProps) => {
    return (
        <div>
            {times.map(time => <Chip label={time} variant='outlined' color='secondary' />)}
        </div>
    )
}



export default TimePicker;