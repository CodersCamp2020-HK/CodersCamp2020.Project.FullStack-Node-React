import React from 'react';
import { Paper, TextField, Avatar, useTheme } from '@material-ui/core';
import { LockOutlined } from '@material-ui/icons';

const Login = () => {
    const theme = useTheme()
    return (
        <Paper variant='outlined' square={false}>
            <Avatar>
                <LockOutlined />
            </Avatar>
        </Paper>
    );
};

export default Login;
