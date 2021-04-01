import React from 'react';
import {Radio, FormControlLabel } from '@material-ui/core'

interface RadioProps {
    label: string;
}
const LabeledRadio = ({label }: RadioProps) => {
    return (
        <FormControlLabel label={label} value={label} control={<Radio />} />
    )
};

export default LabeledRadio;
