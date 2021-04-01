import React, {useState} from 'react';
import {Checkbox, FormGroup, FormControlLabel } from '@material-ui/core'

interface CheckBoxProps {
    label: string;
    checked: boolean;
    disabled: boolean;
    onChange: () => void;
    name: string

}
const LabeledCheckBox = ({label, checked = false, disabled=false, onChange, name}: CheckBoxProps) => {
    return (
        <FormControlLabel label={label} control={<Checkbox disabled={disabled} checked={checked} onChange={onChange}/>} name={name} />
    )
};

export default LabeledCheckBox;
