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
        </div>
    )
}

export default RegisterForm
