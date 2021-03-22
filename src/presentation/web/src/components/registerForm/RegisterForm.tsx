import React from 'react'
import { useForm } from 'react-hook-form'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { useMutate } from 'restful-react';

interface Inputs {
    name: string;
    surname: string;
    mail: string;
    password: string;
    repPassword: string;
    phone: number
}

function RegisterForm() {   
    const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const { register, handleSubmit, errors, setError, getValues, formState, trigger } = useForm<Inputs>()
    const { mutate } = useMutate({
        verb: 'POST',
        path: '/users'
    })
    const onSubmit = async ({name, surname, mail, password, repPassword, phone}: Inputs) => {
            mutate({
                name,
                surname,
                mail,
                password,
                repPassword,
                phone
            }).catch((error) => {
                setError('mail', { message: error.data.message })
            })
        
    }
    const validateRepeat = () => {
        if (formState.isSubmitted) trigger('repPassword')
    }

    const repeatPassowrd = (value: string) => value === getValues().password || 'Hasła muszą być takie same!'


    return (
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
                label="Password"
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
            <TextField
                name="phone"
                label="Telefon"
                required
                inputRef={register({ required: 'Telefon jest wymagany!', pattern: { value: /^\d{9}$/, message: 'Telefon musi zawierać 9 cyfr' }, valueAsNumber: true })}
                error={errors.phone ? true : false}
                helperText={errors.phone ? errors.phone.message : undefined}
            />
            <Button variant="contained" color="primary" type="submit" >Zarejestruj się</Button>
        </form>
    )
}

export default RegisterForm
