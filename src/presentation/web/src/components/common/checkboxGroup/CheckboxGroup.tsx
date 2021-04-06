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
}

const useStyles = makeStyles((theme) => ({
    root: {
        color: theme.palette.text.primary
    },
    formControl: {
        display: 'flex'
    },
    helperText: {
        margin: 0,
        marginRight: 14,
        marginLeft: 14,
        marginTop: 3
    }
}))

const CheckboxGroup = ({ values, name, getCheckedData, question, errors }: CheckboxGroupProps) => {
    const classes = useStyles();
    const [items, setItems] = useState(values);

    useEffect(() => {
        getCheckedData(
            name,
            values.filter((el) => el.checked),
        );
    }, []);

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
        <FormControl className={classes.formControl} error={errors.hasOwnProperty(name)} component="fieldset" >
            <FormGroup>
                <FormLabel focused={false} classes={{ root: classes.root }}>{question}</FormLabel>
                {items.map((el, index) => (
                    <LabeledCheckBox
                        key={index}
                        checked={el.checked}
                        disabled={el.disabled}
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
