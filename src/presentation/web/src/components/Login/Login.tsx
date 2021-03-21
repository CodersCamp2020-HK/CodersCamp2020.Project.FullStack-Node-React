import { Avatar, Button, Grid, Paper, TextField, Theme, Typography, useTheme } from '@material-ui/core';
import { LockOutlined } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutate } from 'restful-react';

interface IFormValues {
    'E-mail': string;
    Password: string;
}

const Login = () => {
    const theme = useTheme<Theme>();
    const { error, mutate: auth } = useMutate({
        verb: 'POST',
        path: '/users/auth',
    });
    const { register, handleSubmit, errors } = useForm<IFormValues>();
    const onSubmit = async (data: IFormValues) => {
        console.log(data);
        try {
            const response = await auth({
                mail: data['E-mail'],
                password: data.Password,
            });
            console.log(response);
            localStorage.setItem('apiKey', response.apiKey);
        } catch (error) {
            console.log(error);
        }
    };
    const useStyle = makeStyles({
        greenBackground: {
            backgroundColor: theme.palette.secondary.dark,
        },
        paper: {
            padding: theme.spacing(2),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        form: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        forgetPassword: {
            alignSelf: 'right',
        },
    });

    const classes = useStyle();

    return (
        <Grid container spacing={0} alignItems="center" justify="center" style={{ minHeight: '100vh' }}>
            <Paper className={classes.paper} variant="outlined" square={false}>
                <Avatar variant="circular" className={classes.greenBackground}>
                    <LockOutlined htmlColor={theme.palette.secondary.contrastText} />
                </Avatar>
                <Typography variant="h5">Zaloguj się</Typography>
                <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
                    <TextField
                        label="E-mail"
                        type="email"
                        name="E-mail"
                        variant="outlined"
                        size="medium"
                        fullWidth
                        error={errors['E-mail'] ? true : false}
                        autoFocus
                        inputRef={register({ required: true })}
                        helperText={errors['E-mail'] && 'E-mail jest wymagany'}
                    />
                    <TextField
                        label="Password"
                        type="password"
                        name="Password"
                        variant="outlined"
                        size="medium"
                        fullWidth
                        error={errors.Password ? true : false}
                        helperText={errors.Password && 'Hasło jest wymagane'}
                        inputRef={register({ required: true })}
                    />
                    <Button variant="contained" size="large" fullWidth color="primary" type="submit">
                        Zaloguj się
                    </Button>
                </form>
                <Typography className={classes.forgetPassword} variant="body2">
                    Zapomniałeś hasła?
                </Typography>
            </Paper>
        </Grid>
    );
};

export default Login;
