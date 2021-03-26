import React from 'react';
import { useForm } from 'react-hook-form';
import { Theme, useTheme, makeStyles } from '@material-ui/core';
import { useMutate } from 'restful-react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import SvgIcon from '@material-ui/core/SvgIcon';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';


interface Inputs {
    password: string;
    repPassword: string;
}

const ChangePassword: React.FC = () => {
    const theme = useTheme<Theme>();
    const useStyle = makeStyles({
        lockBackground: {
            backgroundColor: theme.palette.secondary.dark,
            borderRadius: 90,
            padding: 8,
            marginBottom: 10
        },
        lockIcon: {
            color: '#FFF',
            opacity: .87,
        },
        submit: {
            filter: 'drop-shadow(0px 3px 1px rgba(0, 0, 0, 0.2)), drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.14)), drop-shadow(0px 1px 5px rgba(0, 0, 0, 0.12))',
            marginBottom: 10
        },
        paper: {
            color: theme.palette.background.paper,
            margin: '3rem 0',
            padding: '20px 50px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center'
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
            <Paper className={classes.paper} variant="outlined" square={false}>
                <SvgIcon className={classes.lockBackground}>
                    <LockOutlinedIcon className={classes.lockIcon} />
                </SvgIcon>
                <Typography className={classes.text} variant="h5" component="span">Zarejestruj się</Typography>
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
                    inputRef={register({ required: true, validate: { repeatPassowrd: repeatPassword } })}
                    error={errors.hasOwnProperty('repPassword')}
                    helperText={errors.repPassword && errors.repPassword.message}
                />
                </form>
            </Paper>
        </Grid>
    )
}

export default ChangePassword
