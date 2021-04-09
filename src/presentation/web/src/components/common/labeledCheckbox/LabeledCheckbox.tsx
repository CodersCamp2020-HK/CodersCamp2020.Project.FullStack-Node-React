import React from 'react';
import {Checkbox, FormControlLabel } from '@material-ui/core'

interface CheckBoxProps {
    label: string;
    checked?: boolean;
    disabled?: boolean;
    onChange: () => void;
    name: string;

}
const LabeledCheckBox = ({label, checked = false, disabled=false, onChange, name}: CheckBoxProps) => {
    return (
        <FormControlLabel
            disabled={disabled}
            label={label}
            control={<Checkbox disabled={disabled} checked={checked} onChange={onChange} />}
            name={name}
            style={{ flexBasis: 'auto' }}
        />
    )
};

export default LabeledCheckBox;
