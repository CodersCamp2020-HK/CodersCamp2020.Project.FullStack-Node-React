import React from 'react';
import {Radio, FormControlLabel, Theme } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles';

interface RadioProps {
    label: string;
}

const useStyles = makeStyles((theme: Theme) => ({
    label: {
        '&$disabled': {
            color: theme.palette.text.primary
        }
    },
    disabled: {}
}))

const LabeledRadio = ({label }: RadioProps) => {
    const classes = useStyles();

    return (
        <FormControlLabel label={label} value={label} control={<Radio />} classes={{ label: classes.label, disabled: classes.disabled }} />
    )
};

export default LabeledRadio;
