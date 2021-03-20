import React from 'react'
import TextInput from '../textInput/TextInput'
import { useForm } from 'react-hook-form'

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

    return (
        <div>
            <TextInput name="name" label="Imię" ref={register} />
            <TextInput name="surname" label="Nazwisko" ref={register} />
            <TextInput name="mail" label="Email" type="email" ref={register} />
            <TextInput name="password" label="Password" type="password" ref={register} />
            <TextInput name="repPassword" label="Powtórz hasło" type="password" ref={register} />
            <TextInput name="phone" label="Telefon" ref={register} />
        </div>
    )
}

export default RegisterForm
