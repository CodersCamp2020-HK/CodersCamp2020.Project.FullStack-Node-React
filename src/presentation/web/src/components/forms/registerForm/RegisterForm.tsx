import React from 'react'
import { useForm } from 'react-hook-form'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { KeyboardDatePicker } from '@material-ui/pickers';
import { makeStyles } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import plLocale from 'date-fns/locale/pl';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import differenceInYears from 'date-fns/differenceInYears'

export interface Inputs {
    name: string;
    surname: string;
    mail: string;
    password: string;
    repPassword: string;
    birthDate: Date;
    phone: number;
}

interface Props {
    handleSubmit: (data: any) => Promise<any>;
    defaultValues?: Partial<Inputs>;
}

const useStyle = makeStyles({
    submit: {
        filter: 'drop-shadow(0px 3px 1px rgba(0, 0, 0, 0.2)), drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.14)), drop-shadow(0px 1px 5px rgba(0, 0, 0, 0.12))',
        marginBottom: 15
    },
    textField: {
        '& .MuiFormHelperText-root': {
            position: 'absolute',
            paddingBottom: 25,
            bottom: 0
        },
        paddingBottom: 50,
        position: 'relative'
    }
})

const RegisterForm: React.FC<Props> = ({ handleSubmit: submitCb, defaultValues }) => {
    const classes = useStyle();

    const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    const { register, handleSubmit, errors, getValues, setValue, formState, trigger, watch } = useForm<Inputs>({
        defaultValues: {
            birthDate: new Date(),
            ...defaultValues
        }
    })
    const handleDateChange = (date: Date | null): void => {
        setValue("birthDate", date);
      };

    const validateRepeatPassword = () => {
        if (formState.isSubmitted) trigger('repPassword')
    }
    const validateRepeatBirthDate = () => {
        if (formState.isSubmitted) trigger('birthDate')
    }
    const repeatPassword = (value: string) => value === getValues().password || 'Hasła muszą być takie same!';
    const validatebirthDateAfterToday = (value: Date) => value < new Date() || 'Podaj wcześniejszą datę!';
    const validateBirthDateBefore = (value: Date) => value > new Date(1900, 1) || "Podaj późniejszą datę!";
    const validateBirthDateAdult = (value: Date) => {
        return differenceInYears(new Date(), value) >= 18 || 'Wymagane jest 18 lat, aby założyć konto!'
    };
    const validateDate = (value: Date) => value instanceof Date && !isNaN(value.getTime()) || 'Podaj datę w formacie DD/MM/RRRR!';
    register({ name: 'birthDate', type: 'custom'}, { required: 'Data urodzenia jest wymagana!', validate: { validateDate, validateBirthDateBefore, validatebirthDateAfterToday, validateBirthDateAdult } })

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={plLocale}>
            <form onSubmit={handleSubmit(submitCb)} noValidate>
                <TextField
                    className={classes.textField}
                    id="name"
                    name="name"
                    label="Imię"
                    required
                    inputRef={register({ required: 'Imię jest wymagane!', minLength: { value: 2, message: 'Imię za krótkie!' }, maxLength: { value: 50, message: 'Imię za długie'} })}
                    error={errors.hasOwnProperty('name')}
                    helperText={errors.name && errors.name.message}
                    data-testid="nameInput"
                />
                <TextField
                    className={classes.textField}
                    id="surname"
                    name="surname"
                    label="Nazwisko"
                    required
                    inputRef={register({ required: 'Nazwisko jest wymagane!', minLength: { value: 2, message: 'Nazwisko za krótkie' }, maxLength: { value: 50, message: 'Nazwisko za długie' } })}
                    error={errors.hasOwnProperty('surname')}
                    helperText={errors.surname && errors.surname.message}
                    data-testid="surnameInput"
                />
                <TextField
                    className={classes.textField}
                    id="mail"
                    name="mail"
                    label="Email"
                    type="email"
                    required
                    inputRef={register({ required: 'Email jest wymagany!', pattern: { value: emailPattern, message: 'Nieprawidłowy email!'} })}
                    error={errors.hasOwnProperty('mail')}
                    helperText={errors.mail && errors.mail.message}
                    data-testid="mailInput"
                />
                <TextField
                    className={classes.textField}
                    id="password"
                    name="password"
                    label="Hasło"
                    type="password"
                    required
                    onChange={validateRepeatPassword}
                    inputRef={register({ required: 'Hasło jest wymagane!', pattern: { value: passwordPattern, message: 'Hasło musi zawierać co najmniej 8 znaków, jedną małą literę, jedną wielką literę, jedną liczbę oraz jeden znak specjalny (@$!%*?&)!' } })}
                    error={errors.hasOwnProperty('password')}
                    helperText={errors.password && errors.password.message}
                    data-testid="passwordInput"
                />
                <TextField
                    className={classes.textField}
                    id="repPassword"
                    name="repPassword"
                    label="Powtórz hasło"
                    type="password"
                    required
                    inputRef={register({ required: 'Powtórzone hasło jest wymagane!', validate: { repeatPassword } })}
                    error={errors.hasOwnProperty('repPassword')}
                    helperText={errors.repPassword && errors.repPassword.message}
                    data-testid="repPasswordInput"
                />
                <KeyboardDatePicker
                    disableFuture
                    required
                    className={classes.textField}
                    id="birthDate"
                    name="birthDate"
                    value={watch('birthDate')}
                    openTo="year"
                    format="dd/MM/yyyy"
                    placeholder="DD/MM/YYYY"
                    views={['year', 'month', 'date']}
                    label="Data urodzenia"
                    invalidDateMessage=""
                    onChange={(date: Date | null) => {
                        handleDateChange(date)
                        validateRepeatBirthDate()
                    }}
                    error={errors.hasOwnProperty('birthDate')}
                    helperText={errors.birthDate && errors.birthDate.message}
                    data-testid="birthDateInput"
                />
                <TextField
                    className={classes.textField}
                    id="phone"
                    name="phone"
                    label="Telefon"
                    required
                    inputRef={register({ required: 'Telefon jest wymagany!', pattern: { value: /^\d{9}$/, message: 'Numer telefonu musi zawierać 9 cyfr!' }, valueAsNumber: true })}
                    error={errors.hasOwnProperty('phone')}
                    helperText={errors.phone && errors.phone.message}
                    data-testid="phoneInput"
                />
                <Button
                disabled={formState.isSubmitting}
                    className={classes.submit}
                    fullWidth
                    size="large"
                    variant="contained"
                    color="primary"
                    type="submit"
                    data-testid="formSubmit">
                        Zarejestruj się
                </Button>
            </form>
        </MuiPickersUtilsProvider>
    )
}

export default RegisterForm
