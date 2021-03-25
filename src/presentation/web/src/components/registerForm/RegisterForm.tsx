import React, { useState, useEffect } from 'react'
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
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Link as RouterLink } from 'react-router-dom';
import FnsUtils from '@date-io/date-fns';
import plLocale from 'date-fns/locale/pl';

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
            marginBottom: 10
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
        }
    })
    const classes = useStyle();
    const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const { register, handleSubmit, setError, errors, getValues, setValue, formState, trigger } = useForm<Inputs>({})

    const [date, setDate] = useState(new Date());
    const handleDateChange = (date: Date | null): void => {
        date && setDate(date);
        setValue("birthDate", date);
      };
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

    const validateRepeatPassword = () => {
        if (formState.isSubmitted) trigger('repPassword')
    }
    const validateRepeatBirthDate = () => {
        if (formState.isSubmitted) trigger('birthDate')
    }
    const repeatPassword = (value: string) => value === getValues().password || 'Hasła muszą być takie same!'
    const validatebirthDateAfterToday = (value: Date) => value < new Date() || 'Data musi być wcześniejsza!'
    const validateBirthDateBefore = (value: Date) => value > new Date(1900, 1) || "Data musi być późniejsza!"

    useEffect(() => {
        register({ name: 'birthDate', type: 'custom'}, { required: 'Data urodzenia jest wymagana!', validate: { validateBirthDateBefore, validatebirthDateAfterToday } })
    }, [])
    return (
        <Grid item xs={12} md={8} lg={6}>
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
                        error={errors.hasOwnProperty('name')}
                        helperText={errors.name && errors.name.message}
                    />
                    <TextField
                        name="surname"
                        label="Nazwisko"
                        required
                        inputRef={register({ required: 'Nazwisko jest wymagane!', minLength: { value: 2, message: 'Nazwisko za krótkie' }, maxLength: { value: 50, message: 'Nazwisko za długie' } })}
                        error={errors.hasOwnProperty('surname')}
                        helperText={errors.surname && errors.surname.message}
                    />
                    <TextField
                        name="mail"
                        label="Email"
                        type="email"
                        required
                        inputRef={register({ required: 'Email jest wymagany!', pattern: { value: emailPattern, message: 'Nieprawidłowy email!'} })}
                        error={errors.hasOwnProperty('mail')}
                        helperText={errors.mail && errors.mail.message}
                    />
                    <TextField
                        name="password"
                        label="Hasło"
                        type="password"
                        required
                        onChange={validateRepeatPassword}
                        inputRef={register({ required: 'Hasło jest wymagane', pattern: { value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, message: 'Hasło musi zawierać co najmniej jedną małą literę, jedną wielką literę, jedną liczbę oraz jeden znak specjalny (@$!%*?&)!' } })}
                        error={errors.hasOwnProperty('password')}
                        helperText={errors.password && errors.password.message}
                    />
                    <TextField
                        name="repPassword"
                        label="Powtórz hasło"
                        type="password"
                        required
                        inputRef={register({ required: true, validate: { repeatPassowrd: repeatPassword } })}
                        error={errors.hasOwnProperty('repPassword')}
                        helperText={errors.repPassword && errors.repPassword.message}
                    />
                    <MuiPickersUtilsProvider utils={FnsUtils} locale={plLocale}>
                        <KeyboardDatePicker
                            required
                            name="birthDate"
                            disableFuture
                            value={date}
                            openTo="year"
                            format="dd/MM/yyyy"
                            placeholder="DD/MM/YYYY"
                            lang="pl"
                            views={['year', 'month', 'date']}
                            label="Data urodzenia"
                            invalidDateMessage=""
                            onChange={(date: Date | null) => {
                                handleDateChange(date)
                                validateRepeatBirthDate()
                            }}
                            error={errors.hasOwnProperty('birthDate')}
                            helperText={errors.birthDate && errors.birthDate.message}
                        />
                    </MuiPickersUtilsProvider>
                    <TextField
                        name="phone"
                        label="Telefon"
                        required
                        inputRef={register({ required: 'Telefon jest wymagany!', pattern: { value: /^\d{9}$/, message: 'Telefon musi zawierać 9 cyfr' }, valueAsNumber: true })}
                        error={errors.hasOwnProperty('phone')}
                        helperText={errors.phone && errors.phone.message}
                    />
                    <Button className={classes.submit} fullWidth variant="contained" color="primary" type="submit">Zarejestruj się</Button>
                </form>
                <Link className={classes.link} component={RouterLink} to="/login">Masz już konto? Zaloguj się</Link>
            </Paper>
        </Grid>
    )
}

export default RegisterForm
