import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LabeledCheckBox from '../labeledCheckbox/LabeledCheckbox';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import { DeepMap, FieldError, FieldValues } from 'react-hook-form';

export interface SingleOption {
    content: string;
    checked: boolean;
    disabled: boolean;
}

interface CheckboxGroupProps {
    values: SingleOption[];
    name: string;
    getCheckedData: (name: string, data: SingleOption[]) => void;
    question: string;
    errors: DeepMap<FieldValues, FieldError>;
    disabled: boolean;
}

const useStyles = makeStyles((theme) => ({
    formControl: {
        display: 'flex',
        flexDirection: 'column',
    },
    formGroup: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        position: 'relative',
        paddingBottom: 12
    },
    formLabel: {
        color: theme.palette.text.primary
    },
    helperText: {
        position: 'absolute',
        bottom: 0,
        left: 14
    },
}))

const CheckboxGroup = ({ values, name, getCheckedData, question, errors, disabled }: CheckboxGroupProps) => {
    const classes = useStyles();
    const [items, setItems] = useState<SingleOption[]>(values);

    useEffect(() => {
        getCheckedData(
            name,
            items.filter((el) => el.checked),
        );
    }, [items]);

    const handleChange = (content: string) => {
        const foundedItemIndex = items.findIndex((item) => item.content == content);
        if (foundedItemIndex > -1) {
            const foundedItem = items[foundedItemIndex];
            const modifiedItems = [...items];
            modifiedItems[foundedItemIndex] = { content: foundedItem.content, checked: !foundedItem.checked, disabled: foundedItem.disabled };
            setItems(modifiedItems);
        }
    };

    return (
        <FormControl className={classes.formControl} error={errors.hasOwnProperty(name)} component="fieldset" disabled={disabled} >
            <FormGroup className={classes.formGroup}>
                <FormLabel className={classes.formLabel} focused={false} error={false}>{question}</FormLabel>
                {items.map((el, index) => (
                    <LabeledCheckBox
                        key={index}
                        checked={el.checked}
                        disabled={disabled}
                        name={name}
                        label={el.content}
                        onChange={() => handleChange(el.content)}
                    />
                ))}
                <FormHelperText className={classes.helperText}>{errors[name] && errors[name].message}</FormHelperText>
            </FormGroup>
        </FormControl>
    );
};

export default CheckboxGroup;
