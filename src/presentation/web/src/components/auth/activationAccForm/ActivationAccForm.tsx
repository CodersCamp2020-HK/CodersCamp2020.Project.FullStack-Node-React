import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { makeStyles } from '@material-ui/core';
import AuthPaper from '../authPaper/AuthPaper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import LoadingCircleSmall from '../../loadingCircleSmall/LoadingCircleSmall';
import { useSendActivationLink } from '../../../client';
import { Redirect } from 'react-router-dom';

interface Inputs {
    mail: string;
}

const useStyles = makeStyles({
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
    },
})

const ActivationAccForm = () => {
    const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const { register, handleSubmit, errors, formState, setError } = useForm<Inputs>();
    const { mutate: sendLink } = useSendActivationLink({});
    const classes = useStyles()
    const [fireRedirect, setFireRedirect] = useState(false);

    const onSubmit = async ({ mail }: Inputs) => {
        try {
            await sendLink({ email: mail });
            setFireRedirect(true);
        } catch (error) {
            if (error.status == 400) {
                setError('mail', { message: 'Nie znaleziono adresu email' })
            } else {
                console.error(error);
            }
        }
    }

    return (
        <AuthPaper typographyLabel="Wyślij link aktywacyjny">
            <form noValidate onSubmit={handleSubmit(onSubmit)}>
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
                <Button
                        disabled={formState.isSubmitting}
                        className={classes.submit}
                        fullWidth
                        size="large"
                        variant="contained"
                        color="primary"
                        type="submit"
                        data-testid="formSubmit">
                        Zarejestruj się {formState.isSubmitting && <LoadingCircleSmall size={20} />}
                </Button>
            </form>
            {fireRedirect && <Redirect to={'/auth/link'} />}
        </AuthPaper>
    )
}

export default ActivationAccForm
