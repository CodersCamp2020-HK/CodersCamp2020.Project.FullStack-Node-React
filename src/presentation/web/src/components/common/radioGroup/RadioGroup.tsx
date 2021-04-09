import { RadioGroup as RadioGroupMui, Theme } from '@material-ui/core'
import React, { useEffect, useState } from 'react';
import LabeledRadio from '../labeledRadio/LabeledRadio';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import { DeepMap, FieldError, FieldValues } from 'react-hook-form';
import makeStyles from '@material-ui/styles/makeStyles';

export interface SingleOption {
    content: string;
}

interface RadioGroupProps {
    values: SingleOption[];
    name: string;
    getCheckedOption: (name: string, option: string) => void;
    question: string;
    errors: DeepMap<FieldValues, FieldError>;
    defaultValue: string | undefined;
    disabled: boolean;
}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        '&$disabled': {
            color: theme.palette.text.primary,
        },
        color: theme.palette.text.primary,
    },
    disabled: {},
    formControl: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        position: 'relative',
        paddingBottom: 12
    },
    helperText: {
        position: 'absolute',
        left: 14,
        bottom: 0,
    },
}))

const RadioGroup = ({ values, name, getCheckedOption, question, errors, defaultValue, disabled }: RadioGroupProps) => {
    const classes = useStyles();
    const [checkedOption, setCheckedOption] = useState<string>(defaultValue ?? '');

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
        <FormControl component="fieldset" error={errors.hasOwnProperty(name)} className={classes.formControl} disabled={disabled}>
            <FormLabel focused={false} error={false} classes={{ root: classes.root, disabled: classes.disabled }}>{question}</FormLabel>
            <RadioGroupMui name={name} value={checkedOption} onChange={handleChange}>
                {values.map((option, index) => <LabeledRadio key={index} label={option.content} /> )}
            </RadioGroupMui>
            <FormHelperText className={classes.helperText}>{errors[name] && errors[name].message}</FormHelperText>
        </FormControl>
    );
};

export default RadioGroup;
