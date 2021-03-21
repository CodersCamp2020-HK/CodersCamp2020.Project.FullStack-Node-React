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
    const { register, handleSubmit, errors } = useForm<Inputs>({ criteriaMode: 'all' })
    const onSubmit = (data: Inputs) => {
        console.log(data);
    }

    const isError = errors.name ? true : false
    const errorNameMsg = errors.name && ((errors.name.type === 'required' && errors.name.message) || (errors.name.type === 'minLength' && 'Imię za krótkie!' && errors.name.message))
    console.log(errors)

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <TextInput name="name" label="Imię" required inputRef={register({ required: 'Imię jest wymagane!', minLength: { value: 2, message: 'Imię za krótkie!' } })} error={isError} helperText={errorNameMsg} />

            <TextInput name="surname" label="Nazwisko" required inputRef={register({ required: true })} />
            {errors.surname && <p>Nazwisko jest wymagane!</p>}

            <TextInput name="mail" label="Email" type="email" required inputRef={register({ required: true })} />
            {errors.mail && <p>Nazwisko jest wymagane!</p>}

            <TextInput name="password" label="Password" type="password" required inputRef={register({ required: true })} />
            {errors.password && <p>Nazwisko jest wymagane!</p>}

            <TextInput name="repPassword" label="Powtórz hasło" type="password" required inputRef={register({ required: true })} />
            {errors.repPassword && <p>Nazwisko jest wymagane!</p>}

            <TextInput name="phone" label="Telefon" required inputRef={register({ required: true, valueAsNumber: true })} />
            {errors.phone && <p>Nazwisko jest wymagane!</p>}

            <Button variant="contained" color="primary" type="submit" >Zarejestruj się</Button>
        </form>
    )
}

export default RegisterForm
