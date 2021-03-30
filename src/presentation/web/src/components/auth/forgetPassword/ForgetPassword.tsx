import { Avatar, Button, Grid, Link, Paper, TextField, Theme, Typography, useTheme } from '@material-ui/core';
import { LockOutlined } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link as RouterLink } from 'react-router-dom';
import { useMutate } from 'restful-react';
import AuthPaper from '../authPaper/AuthPaper';

interface Email {
    'E-mail': string;
}

const theme = useTheme<Theme>();
const useStyle = makeStyles({
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
    },
    message: {
        marginBottom: 20
    },
    textField: {
        marginBottom: 35,
    },
    backToLogin: {
        alignSelf: 'flex-end',
        color: theme.palette.info.dark,
    },
    submit: {
        marginBottom: 15
    },
});

const ForgetPassword = () => {
    const classes = useStyle();

    const { error, mutate: sendResetLink } = useMutate({
        verb: 'POST',
        path: '/users/reset',
    });

    const [emailError, setEmailError] = useState<string>(null!);

    const { register, handleSubmit, errors } = useForm<Email>();
    const onSubmit = async (data: Email) => {
        try {
            const response = await sendResetLink({
                email: data['E-mail'],
            });
            setEmailError('');
        } catch (error) {
            if (error.status == 404) {
                setEmailError('Podany e-mail nie istnieje w bazie');
            } else if (error.status == 400) {
                setEmailError('Niepoprawny format e-mail');
            } else {
                setEmailError('Błąd serwera! Spróbuj ponownie później.');
            }
        }
    };

    return (
        <Grid item xs={12} sm={10} md={6}>
            <AuthPaper typographyLabel="Zapomniałeś hasła?">
                <Typography className={classes.message} variant="body1">
                    Wystarczy, że podasz swój e-mail, a my pomożemy Ci ustawić nowe hasło.
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
                    <TextField
                        label="E-mail"
                        type="email"
                        name="E-mail"
                        className={classes.textField}
                        fullWidth
                        required
                        autoFocus
                        error={errors['E-mail'] ? true : false}
                        inputRef={register({ required: true })}
                        helperText={errors['E-mail'] && 'E-mail jest wymagany'}
                    />
                    <Button
                        className={classes.submit}
                        variant="contained"
                        size="large"
                        fullWidth
                        color="primary"
                        type="submit"
                    >
                        Zresetuj hasło
                    </Button>
                    <Typography variant="body2" color='error'>{emailError}</Typography>
                </form>
                <Link component={RouterLink} className={classes.backToLogin} to="/auth">
                    <Typography variant="body2">Wróć do logowania</Typography>
                </Link>
            </AuthPaper>
        </Grid>
    );
};

export default ForgetPassword;
