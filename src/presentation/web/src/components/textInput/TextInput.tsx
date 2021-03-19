import React from 'react';
import TextField from '@material-ui/core/TextField';

interface TextInputProps {
    id: string;
    label: string;
    type?: string;
    variant?: 'filled' | 'outlined' | 'standard';
    size?: 'medium' | 'small';
    required?: boolean;
}

const TextInput = ({
    id,
    label,
    type = 'text',
    variant = 'outlined',
    size = 'medium',
    required = false,
}: TextInputProps) => {
    return <TextField id={id} label={label} type={type} variant={variant} size={size} required={required} />;
};

export default TextInput;
