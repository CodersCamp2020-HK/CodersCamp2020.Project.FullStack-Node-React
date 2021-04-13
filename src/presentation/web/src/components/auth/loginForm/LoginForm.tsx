import { Button, Grid, Link, Paper, TextField, Theme, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import jwt from 'jsonwebtoken';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link as RouterLink, Redirect } from 'react-router-dom';
import { AppCtx } from '../../../App';
import { useLoginUser } from '../../../client';
import { UserType } from '../../../client/index';
import LoadingCircleSmall from '../../loadingCircleSmall/LoadingCircleSmall';
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
        alignItems: 'center',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        position: 'relative',
        paddingBottom: 20,
    },
    textField: {
        '& .MuiFormHelperText-root': {
            position: 'absolute',
            paddingBottom: 25,
            bottom: 0,
        },
        paddingBottom: 50,
        position: 'relative',
    },
    forgetPassword: {
        alignSelf: 'flex-end',
        color: theme.palette.info.dark,
    },
    submit: {
        filter:
            'drop-shadow(0px 3px 1px rgba(0, 0, 0, 0.2)), drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.14)), drop-shadow(0px 1px 5px rgba(0, 0, 0, 0.12))',
        marginBottom: 15,
    },
    loginError: {
        position: 'absolute',
        bottom: 0,
    },
}));

interface IUserInfo {
    role: UserType;
    id: number;
    name: string;
    iat: number;
}

const isUserInfo = (user: unknown): user is IUserInfo => {
    return (
        typeof (user as IUserInfo).id === 'number' &&
        typeof (user as IUserInfo).role === 'string' &&
        typeof (user as IUserInfo).iat === 'number'
    );
};

const LoginForm = () => {
    const classes = useStyle();
    const { appState, setAppState } = useContext(AppCtx);

    const [loginError, setLoginError] = useState<string>(null!);
    const [fireRedirect, setFireRedirect] = useState<boolean>(false);
    const { error, mutate: auth, loading } = useLoginUser({});

    const { register, handleSubmit, errors } = useForm<IFormValues>();
    const onSubmit = async (data: IFormValues) => {
        try {
            const response = await auth({
                mail: data['E-mail'],
                password: data.Password,
            });
            localStorage.setItem('apiKey', response.apiKey);
            const decodedToken = jwt.decode(response.apiKey);
            if (isUserInfo(decodedToken)) {
                setAppState({
                    userId: decodedToken.id,
                    role: decodedToken.role,
                    userName: decodedToken.name,
                });
            }
            setFireRedirect(true);
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
                        label="Email"
                        type="email"
                        name="E-mail"
                        className={classes.textField}
                        onChange={() => setLoginError('')}
                        required
                        autoFocus
                        error={errors['E-mail'] ? true : false}
                        inputRef={register({ required: true })}
                        helperText={errors['E-mail'] && 'E-mail jest wymagany'}
                    />
                    <TextField
                        label="Hasło"
                        type="password"
                        name="Password"
                        className={classes.textField}
                        onChange={() => setLoginError('')}
                        required
                        error={errors.Password ? true : false}
                        helperText={errors.Password && 'Hasło jest wymagane'}
                        inputRef={register({ required: true })}
                    />
                    <Button
                        className={classes.submit}
                        variant="contained"
                        size="large"
                        fullWidth
                        color="primary"
                        type="submit"
                        disabled={loading}
                    >
                        Zaloguj się {loading && <LoadingCircleSmall size={8} />}
                    </Button>
                    {loginError && (
                        <Typography className={classes.loginError} variant="body2" color="primary">
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
            {fireRedirect && <Redirect to={'/'} />}
        </Grid>
    );
};

export default LoginForm;
