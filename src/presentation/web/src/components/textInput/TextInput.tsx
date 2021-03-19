import React from 'react';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Today from '@material-ui/icons/Today';
import styles from './TextInput.module.css';

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
