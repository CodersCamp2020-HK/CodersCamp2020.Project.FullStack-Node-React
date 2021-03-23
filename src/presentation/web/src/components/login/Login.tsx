import { Avatar, Button, Grid, Link, Paper, TextField, Theme, Typography, useTheme } from '@material-ui/core';
import { LockOutlined } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link as RouterLink } from 'react-router-dom';
import { useMutate } from 'restful-react';

interface IFormValues {
    'E-mail': string;
    Password: string;
}

const Login = () => {
    const theme = useTheme<Theme>();
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
            width: '100%',
        },
        forgetPassword: {
            alignSelf: 'flex-end',
            color: theme.palette.info.dark,
        },
        submit: {
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing(2)
        }
    });
    const classes = useStyle();

    const [loginError, setLoginError] = useState<string>(null!);
    const { error, mutate: auth } = useMutate({
        verb: 'POST',
        path: '/users/auth',
    });

    const { register, handleSubmit, errors } = useForm<IFormValues>();
    const onSubmit = async (data: IFormValues) => {
        try {
            const response = await auth({
                mail: data['E-mail'],
                password: data.Password,
            });
            localStorage.setItem('apiKey', response.apiKey);
        } catch (error) {
            if (error.status == 400 || error.status == 422) {
                setLoginError('Błędny e-mail lub hasło!');
            } else {
                setLoginError('Błąd serwera! Spróbuj ponownie później.');
            }
        }
    };
    
    return (
        <Grid spacing={2} container direction="column" item xs={4}>
            <Grid item xs>
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
                            required
                            error={errors['E-mail'] ? true : false}
                            autoFocus
                            inputRef={register({ required: true })}
                            helperText={errors['E-mail'] && 'E-mail jest wymagany'}
                            margin="normal"
                        />
                        <TextField
                            label="Password"
                            type="password"
                            name="Password"
                            variant="outlined"
                            size="medium"
                            fullWidth
                            required
                            error={errors.Password ? true : false}
                            helperText={errors.Password && 'Hasło jest wymagane'}
                            inputRef={register({ required: true })}
                            margin="normal"
                        />
                        <Button className={classes.submit} variant="contained" size="large" fullWidth color="primary" type="submit">
                            Zaloguj się
                        </Button>
                        {loginError && (
                            <Typography variant="body2" color="primary">
                                {loginError}
                            </Typography>
                        )}
                    </form>
                    <Link component={RouterLink} className={classes.forgetPassword} to="/forget">
                        <Typography variant="body2">Zapomniałeś hasła?</Typography>
                    </Link>
                </Paper>
            </Grid>
            <Grid item xs>
                <Paper
                    className={classes.paper}
                    style={{ flexDirection: 'row', justifyContent: 'space-between' }}
                    variant="outlined"
                    square={false}
                >
                    <Typography variant="subtitle1">Nie masz jeszcze konta?</Typography>
                    <Link component={RouterLink} to="/register">
                        <Button variant="outlined" size="medium" color="primary">
                            Zarejestruj się
                        </Button>
                    </Link>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default Login;
