import React, {useState} from 'react';
import {Checkbox, FormGroup, FormControlLabel } from '@material-ui/core'

interface CheckBoxProps {
    label: string;
    checked: boolean;
    onChange: () => void;
    name: string

}
const LabeledCheckBox = ({label, checked = false, onChange, name}: CheckBoxProps) => {
    return (
        <FormControlLabel label={label} control={<Checkbox checked={checked} onChange={onChange}/>} name={name} />
    )
};

export default LabeledCheckBox;
