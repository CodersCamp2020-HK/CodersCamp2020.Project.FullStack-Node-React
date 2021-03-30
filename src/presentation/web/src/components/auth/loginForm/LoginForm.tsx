import { Button, Grid, Link, Paper, TextField, Theme, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link as RouterLink } from 'react-router-dom';
import { useMutate } from 'restful-react';
import AuthPaper from '../authPaper/AuthPaper';

interface IFormValues {
    'E-mail': string;
    Password: string;
}

const useStyle = makeStyles<Theme>((theme) => ({
    paper: {
        backgroundColor: theme.palette.background.paper,
        margin: '3rem 0',
        padding: '20px 50px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
    },
    textField: {
        marginBottom: 35,
    },
    forgetPassword: {
        alignSelf: 'flex-end',
        color: theme.palette.info.dark,
    },
    submit: {
        filter: 'drop-shadow(0px 3px 1px rgba(0, 0, 0, 0.2)), drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.14)), drop-shadow(0px 1px 5px rgba(0, 0, 0, 0.12))',
        marginBottom: 15
    },
}));

const LoginForm = () => {
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
        <Grid item xs={12} sm={10} md={6}>
            <AuthPaper typographyLabel="Zaloguj się">
                <form onSubmit={handleSubmit(onSubmit)} className={classes.form} noValidate>
                    <TextField
                        label="E-mail"
                        type="email"
                        name="E-mail"
                        className={classes.textField}
                        required
                        autoFocus
                        error={errors['E-mail'] ? true : false}
                        inputRef={register({ required: true })}
                        helperText={errors['E-mail'] && 'E-mail jest wymagany'}
                    />
                    <TextField
                        label="Password"
                        type="password"
                        name="Password"
                        className={classes.textField}
                        required
                        error={errors.Password ? true : false}
                        helperText={errors.Password && 'Hasło jest wymagane'}
                        inputRef={register({ required: true })}
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
                <Link component={RouterLink} className={classes.forgetPassword} to="/auth/forget">
                    <Typography variant="body2">Zapomniałeś hasła?</Typography>
                </Link>
            </AuthPaper>
            <Paper
                className={classes.paper}
                style={{ flexDirection: 'row', justifyContent: 'space-between' }}
                variant="outlined"
                square={false}
            >
                <Typography variant="subtitle1">Nie masz jeszcze konta?</Typography>
                <Link component={RouterLink} to="/auth/register">
                    <Button variant="outlined" size="medium" color="primary">
                        Zarejestruj się
                    </Button>
                </Link>
            </Paper>
        </Grid>
    );
};

export default LoginForm;
