import React from 'react';
import { useForm } from 'react-hook-form';
import { Theme, useTheme, makeStyles } from '@material-ui/core';
import { useMutate } from 'restful-react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import SvgIcon from '@material-ui/core/SvgIcon';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Link as RouterLink } from 'react-router-dom';
import AuthPaper from '../authPaper/AuthPaper';


interface Inputs {
    password: string;
    repPassword: string;
}

const theme = useTheme<Theme>();
const useStyle = makeStyles({
    submit: {
        filter: 'drop-shadow(0px 3px 1px rgba(0, 0, 0, 0.2)), drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.14)), drop-shadow(0px 1px 5px rgba(0, 0, 0, 0.12))',
        marginBottom: 35
    },
    text: {
        color: theme.palette.text.primary,
        marginBottom: 35
    },
    link: {
        color: theme.palette.info.dark,
        alignSelf: 'flex-end',
    },
    textField: {
        marginBottom: 35,
    }
})

const ChangePassword: React.FC = () => {
    const classes = useStyle();

    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const { register, errors, trigger, formState, getValues, handleSubmit } = useForm<Inputs>();

    const validateRepeatPassword = () => {
        if (formState.isSubmitted) trigger('repPassword')
    }
    const repeatPassword = (value: string) => value === getValues().password || 'Hasła muszą być takie same!'

    const onSubmit = async ({ password, repPassword }: Inputs) => {
        try {
            console.log(password, repPassword);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Grid item xs={12} sm={10} md={6}>
            <AuthPaper typographyLabel="Ustaw nowe hasło">
                <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    className={classes.textField}
                    name="password"
                    label="Nowe hasło"
                    type="password"
                    required
                    onChange={validateRepeatPassword}
                    inputRef={register({ required: 'Hasło jest wymagane!', pattern: { value: passwordPattern, message: 'Hasło musi zawierać co najmniej 8 znaków, jedną małą literę, jedną wielką literę, jedną liczbę oraz jeden znak specjalny (@$!%*?&)!' } })}
                    error={errors.hasOwnProperty('password')}
                    helperText={errors.password && errors.password.message}
                />
                <TextField
                    className={classes.textField}
                    name="repPassword"
                    label="Powtórz nowe hasło"
                    type="password"
                    required
                    inputRef={register({ required: true, validate: { repeatPassword } })}
                    error={errors.hasOwnProperty('repPassword')}
                    helperText={errors.repPassword && errors.repPassword.message}
                />
                <Button
                    className={classes.submit}
                    fullWidth
                    size="large"
                    variant="contained"
                    color="primary"
                    type="submit">
                        Zresetuj hasło
                </Button>
                </form>
                <Link className={classes.link} component={RouterLink} to="/auth">Wróć do logowania</Link>
            </AuthPaper>
        </Grid>
    )
}

export default ChangePassword
