import React from 'react'
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import { Theme, useTheme, makeStyles } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import AuthPaper from '../authPaper/AuthPaper';
import RegisterForm from '../registerForm/RegisterForm';


const RegisterPage: React.FC = () => {
    const theme = useTheme<Theme>();
    const useStyle = makeStyles({
        submit: {
            filter: 'drop-shadow(0px 3px 1px rgba(0, 0, 0, 0.2)), drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.14)), drop-shadow(0px 1px 5px rgba(0, 0, 0, 0.12))',
            marginBottom: 10
        },
        link: {
            color: theme.palette.info.dark,
            alignSelf: 'flex-end',
        },
        textField: {
            marginBottom: 35,
        }
    })
    const classes = useStyle();
    
    return (
        <Grid item xs={12} sm={10} md={6}>
            <AuthPaper typographyLabel="Zarejestruj się">
                <RegisterForm />
                <Link className={classes.link} component={RouterLink} to="/auth">Masz już konto? Zaloguj się</Link>
            </AuthPaper>
        </Grid>
    )
}

export default RegisterPage
