import React from 'react';
import {Checkbox, FormControlLabel } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
    label: {
        '&$disabled': {
            color: theme.palette.text.primary
        }
    },
    disabled: {}
}))

interface CheckBoxProps {
    label: string;
    checked?: boolean;
    disabled?: boolean;
    onChange: () => void;
    name: string;
}

const LabeledCheckBox = ({label, checked = false, disabled=false, onChange, name}: CheckBoxProps) => {
    const classes = useStyles();

    return (
        <FormControlLabel
            disabled={disabled}
            label={label}
            control={<Checkbox disabled={disabled} checked={checked} onChange={onChange} />}
            name={name}
            style={{ flexBasis: 'auto' }}
            classes={{ label: classes.label, disabled: classes.disabled }}
        />
    )
};

export default LabeledCheckBox;
