import { Avatar, Button, Paper, TextField, Theme, Typography, useTheme } from '@material-ui/core';
import { LockOutlined } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import React, { useState } from 'react';

const Login = () => {
    const theme = useTheme<Theme>();
    const [isErrors, setErrors] = useState<boolean>(false);
    const useStyle = makeStyles({
        greenBackground: {
            backgroundColor: theme.palette.secondary.dark,
        },
    });

    const classes = useStyle();

    return (
        <Paper variant="outlined" square={false}>
            <Avatar variant="circle" className={classes.greenBackground}>
                <LockOutlined htmlColor={theme.palette.secondary.contrastText} />
            </Avatar>
            <form>
                <Typography variant="h5">Zaloguj się</Typography>
                <TextField
                    label="E-mail"
                    type="email"
                    variant="outlined"
                    size="medium"
                    required
                    error={isErrors}
                    autoFocus
                />
                <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    size="medium"
                    required
                    error={isErrors}
                    helperText={isErrors && 'Nieprawidłowy e-mail lub hasło'}
                />
                <Button variant="contained" size="large" color="primary" type="submit">
                    Zaloguj się
                </Button>
            </form>
            <Typography variant="body2">Zapomniałeś hasła?</Typography>
        </Paper>
    );
};

export default Login;
