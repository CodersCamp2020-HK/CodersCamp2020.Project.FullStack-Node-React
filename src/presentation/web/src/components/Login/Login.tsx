import { Avatar, Paper, Theme, useTheme } from '@material-ui/core';
import { LockOutlined } from '@material-ui/icons';
import React from 'react';

const Login = () => {
    const theme = useTheme<Theme>()
    return (
        <Paper variant='outlined' square={false}>
            <Avatar variant='circle' color={theme.palette.secondary.dark}>
                <LockOutlined htmlColor={theme.palette.secondary.contrastText} />
            </Avatar>
        </Paper>
    );
};

export default Login;
