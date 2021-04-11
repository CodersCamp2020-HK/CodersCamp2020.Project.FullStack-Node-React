import React, { useState } from 'react'
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import { Theme, makeStyles } from '@material-ui/core';
import { Link as RouterLink, Redirect } from 'react-router-dom';
import AuthPaper from '../authPaper/AuthPaper';
import RegisterForm, { Inputs } from '../../forms/registerForm/RegisterForm';
import Typography from '@material-ui/core/Typography';
import { useCreateUser } from '../../../client/index';
import { useForm } from 'react-hook-form';


const useStyle = makeStyles<Theme>((theme) => ({
    link: {
        color: theme.palette.info.dark,
        alignSelf: 'flex-end',
    }
}))

const RegisterPage: React.FC = () => {
    const classes = useStyle();
    const { mutate: registerUser } = useCreateUser({})
    const [fireRedirect, setFireRedirect] = useState<boolean>(false);
    const { setError } = useForm();

    const onSubmit = async (inputs: Inputs) => {
        try {
            await registerUser({ ...inputs, birthDate: inputs.birthDate.toISOString()})
            setFireRedirect(true);
        } catch (error) {
            if (error.data.status === 400) setError('mail', { message: error.data.message })
        }
    }
    
    return (
        <Grid item xs={12} sm={10} md={6}>
            <AuthPaper typographyLabel="Zarejestruj się">
                <RegisterForm handleSubmit={onSubmit} />
                <Link className={classes.link} component={RouterLink} to="/auth">
                    <Typography variant="body2">Masz już konto? Zaloguj się</Typography>
                </Link>
            </AuthPaper>
            {fireRedirect && <Redirect to={'/auth/link'} />}
        </Grid>
    )
}

export default RegisterPage
