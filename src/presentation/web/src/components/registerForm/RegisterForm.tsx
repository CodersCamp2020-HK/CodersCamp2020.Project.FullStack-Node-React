import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid';
import SvgIcon from '@material-ui/core/SvgIcon';
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import { Theme, useTheme, makeStyles } from '@material-ui/core';
import { useMutate } from 'restful-react';
import { KeyboardDatePicker } from '@material-ui/pickers';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Link as RouterLink } from 'react-router-dom';

interface Inputs {
    name: string;
    surname: string;
    mail: string;
    password: string;
    repPassword: string;
    birthDate: Date;
    phone: number;
}

function RegisterForm() {
    const theme = useTheme<Theme>();
    const useStyle = makeStyles({
        lockBackground: {
            backgroundColor: theme.palette.secondary.dark,
            borderRadius: 90,
            padding: 8
        },
        lockIcon: {
            color: '#FFF',
            opacity: .87
        },
        submit: {
            filter: 'drop-shadow(0px 3px 1px rgba(0, 0, 0, 0.2)), drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.14)), drop-shadow(0px 1px 5px rgba(0, 0, 0, 0.12))',
            margin: '10px 0'
        },
        paper: {
            color: theme.palette.background.paper,
            padding: '20px 50px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center'
        },
        text: {
            color: theme.palette.text.primary
        },
        link: {
            color: theme.palette.info.main,
            alignSelf: 'flex-end',
            marginTop: 10
        }
    })
    const classes = useStyle();
    const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const { register, handleSubmit, errors, setError, getValues, formState, trigger } = useForm<Inputs>({})
    const [date, setDate] = useState(new Date());
    const { mutate } = useMutate({
        verb: 'POST',
        path: '/users'
    })
    const onSubmit = async ({name, surname, mail, password, repPassword, birthDate, phone}: Inputs) => {
        mutate({
            name,
            surname,
            mail,
            password,
            repPassword,
            birthDate: new Date(birthDate).toISOString(),
            phone
        }).catch((error) => {
            if (error.data.status === 400) setError('mail', { message: error.data.message })
        })
        
    }
    const validateRepeat = () => {
        if (formState.isSubmitted) trigger('repPassword')
    }

    const repeatPassowrd = (value: string) => value === getValues().password || 'Hasła muszą być takie same!'


    return (
        <Grid item xs={5} direction="column" justify="space-between" alignItems="center">
            <Paper className={classes.paper} variant="outlined" square={false}>
                <SvgIcon className={classes.lockBackground}>
                    <LockOutlinedIcon className={classes.lockIcon} />
                </SvgIcon>
                <Typography className={classes.text} variant="h5" component="span">Zarejestruj się</Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        name="name"
                        label="Imię"
                        required
                        inputRef={register({ required: 'Imię jest wymagane!', minLength: { value: 2, message: 'Imię za krótkie!' }, maxLength: { value: 50, message: 'Imię za długie'} })}
                        error={errors.name ? true : false}
                        helperText={errors.name ? errors.name.message : undefined}
                    />
                    <TextField
                        name="surname"
                        label="Nazwisko"
                        required
                        inputRef={register({ required: 'Nazwisko jest wymagane!', minLength: { value: 2, message: 'Nazwisko za krótkie' }, maxLength: { value: 50, message: 'Nazwisko za długie' } })}
                        error={errors.surname ? true : false}
                        helperText={errors.surname ? errors.surname.message : undefined}
                    />
                    <TextField
                        name="mail"
                        label="Email"
                        type="email"
                        required
                        inputRef={register({ required: 'Email jest wymagany!', pattern: { value: emailPattern, message: 'Nieprawidłowy email!'} })}
                        error={errors.mail ? true : false}
                        helperText={errors.mail ? errors.mail.message : undefined}
                    />
                    <TextField
                        name="password"
                        label="Hasło"
                        type="password"
                        required
                        onChange={validateRepeat}
                        inputRef={register({ required: 'Hasło jest wymagane', pattern: { value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, message: 'Hasło musi zawierać co najmniej jedną małą literę, jedną wielką literę, jedną liczbę oraz jeden znak specjalny (@$!%*?&)!' } })}
                        error={errors.password ? true : false}
                        helperText={errors.password ? errors.password.message : undefined}
                    />
                    <TextField
                        name="repPassword"
                        label="Powtórz hasło"
                        type="password"
                        required
                        inputRef={register({ required: true, validate: { repeatPassowrd } })}
                        error={errors.repPassword ? true : false}
                        helperText={errors.repPassword ? errors.repPassword.message : undefined}
                    />
                    <KeyboardDatePicker
                        required
                        name="birthDate"
                        disableFuture
                        minDate="1900-01-01"
                        minDateMessage="Podaj późniejszą datę!"
                        openTo="year"
                        format="dd/MM/yyyy"
                        placeholder="DD/MM/YYYY"
                        views={['year', 'month', 'date']}
                        label="Data urodzenia"
                        invalidDateMessage="Podaj datę w formacie DD/MM/RRRR"
                        maxDateMessage="Podaj wcześniejszą datę!"
                        value={date}
                        onChange={date => date && setDate(date)}
                        inputRef={register({ required: 'Data urodzenia jest wymagana '})}
                    />
                    <TextField
                        name="phone"
                        label="Telefon"
                        required
                        inputRef={register({ required: 'Telefon jest wymagany!', pattern: { value: /^\d{9}$/, message: 'Telefon musi zawierać 9 cyfr' }, valueAsNumber: true })}
                        error={errors.phone ? true : false}
                        helperText={errors.phone ? errors.phone.message : undefined}
                    />
                    <Button className={classes.submit} fullWidth variant="contained" color="primary" type="submit">Zarejestruj się</Button>
                </form>
                <Link className={classes.link} component={RouterLink} to="/login">Masz już konto? Zaloguj się</Link>
            </Paper>
        </Grid>
    )
}

export default RegisterForm
