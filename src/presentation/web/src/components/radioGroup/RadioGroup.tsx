import { RadioGroup as RadioGroupMui } from '@material-ui/core'
import React, { useEffect, useState } from 'react';
import LabeledRadio from '../labeledRadio/LabeledRadio';

export interface SingleOption {
    content: string;
}

interface RadioGroupProps {
    values: SingleOption[];
    name: string;
    getCheckedOption: (name: string, option: string) => void;
}
const RadioGroup = ({ values, name, getCheckedOption }: RadioGroupProps) => {
    const [checkedOption, setCheckedOption] = useState<string>(values[0].content);

    useEffect(() => {
        getCheckedOption(
            name,
            values[0].content,
        );
    }, []);

    useEffect(() => {
        getCheckedOption(
            name,
            checkedOption,
        );
    }, [checkedOption]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCheckedOption(event.target.value);
    };

    return (
        <RadioGroupMui name={name} value={checkedOption} onChange={handleChange}>
            {values.map((option) => <LabeledRadio label={option.content} /> )}
        </RadioGroupMui>
    );
};

export default RadioGroup;
