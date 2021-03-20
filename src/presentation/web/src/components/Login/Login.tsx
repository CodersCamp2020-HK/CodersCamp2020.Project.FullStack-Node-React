import { Avatar, Paper, Theme, useTheme } from '@material-ui/core';
import { LockOutlined } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import React from 'react';

const Login = () => {
    const theme = useTheme<Theme>();
    const useStyle = makeStyles({
        greenBackground: {
            backgroundColor: theme.palette.secondary.dark,
        },
    })

    const classes = useStyle();

    return (
        <Paper variant="outlined" square={false}>
            <Avatar variant="circle" className={classes.greenBackground}>
                <LockOutlined htmlColor={theme.palette.secondary.contrastText} />
            </Avatar>
        </Paper>
    );
};

export default Login;
