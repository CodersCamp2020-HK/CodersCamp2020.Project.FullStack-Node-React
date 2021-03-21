import React from 'react';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Today from '@material-ui/icons/Today';
import styles from './TextInput.module.css';
import { FieldElement } from 'react-hook-form';

interface TextInputProps {
    name: string;
    label: string;
    type?: string;
    variant?: 'filled' | 'outlined' | 'standard';
    size?: 'medium' | 'small';
    required?: boolean;
    color?: 'primary' | 'secondary';
    ref?: any
}

const TextInput = ({
    name,
    label,
    type = 'text',
    variant = 'outlined',
    size = 'medium',
    required = false,
    color = 'secondary',
    ref
}: TextInputProps) => {
    const endAndorment =
        type === 'date'
            ? {
                  endAdornment: (
                      <InputAdornment position="end">
                          <Today className={styles.calendarIcon} />
                      </InputAdornment>
                  ),
              }
            : undefined;
    return (
        <TextField
            name={name}
            label={label}
            type={type}
            variant={variant}
            size={size}
            required={required}
            color={color}
            InputProps={endAndorment}
            ref={ref}
        />
    );
};

export default TextInput;
