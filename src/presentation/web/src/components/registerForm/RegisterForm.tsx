import React from 'react'
import TextInput from '../textInput/TextInput'
import { useForm } from 'react-hook-form'
import Button from '@material-ui/core/Button'

export interface Inputs {
    name: string;
    surname: string;
    mail: string;
    password: string;
    repPassword: string;
    phone: number
}

function RegisterForm() {   
    const { register } = useForm<Inputs>()
    const onSubmit = (data: any) => {
        console.log(data);
    }

    return (
        <form>
            <TextInput name="name" label="Imię" inputRef={register} />
            <TextInput name="surname" label="Nazwisko" inputRef={register} />
            <TextInput name="mail" label="Email" type="email" inputRef={register} />
            <TextInput name="password" label="Password" type="password" inputRef={register} />
            <TextInput name="repPassword" label="Powtórz hasło" type="password" inputRef={register} />
            <TextInput name="phone" label="Telefon" inputRef={register} />
            <Button variant="contained" color="primary" type="submit" >Zarejestruj się</Button>
        </form>
    )
}

export default RegisterForm
