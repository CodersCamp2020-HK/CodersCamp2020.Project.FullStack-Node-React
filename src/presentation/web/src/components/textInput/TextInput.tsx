import React from 'react';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Today from '@material-ui/icons/Today';

interface TextInputProps {
    id: string;
    label: string;
    type?: string;
    variant?: 'filled' | 'outlined' | 'standard';
    size?: 'medium' | 'small';
    required?: boolean;
    color?: 'primary' | 'secondary';
}

const TextInput = ({
    id,
    label,
    type = 'text',
    variant = 'outlined',
    size = 'medium',
    required = false,
    color = 'secondary',
}: TextInputProps) => {
    let endAndorment;
    if (type === 'date') {
        endAndorment = {
            endAdornment: (
                <InputAdornment position="end">
                    <Today />
                </InputAdornment>
            ),
        };
    } else {
        endAndorment = undefined;
    }
    return (
        <TextField
            id={id}
            label={label}
            type={type}
            variant={variant}
            size={size}
            required={required}
            color={color}
            InputProps={endAndorment}
        />
    );
};

export default TextInput;
