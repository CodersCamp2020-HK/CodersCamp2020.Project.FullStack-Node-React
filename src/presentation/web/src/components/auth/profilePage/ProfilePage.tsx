import React, { useContext } from 'react';
import RegisterForm from '../../forms/registerForm/RegisterForm';
import { AppCtx } from '../../../App';
import { useGetUser, useUpdateUser } from '../../../client';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Theme, makeStyles } from '@material-ui/core';
import SvgIcon from '@material-ui/core/SvgIcon'
import PersonOutlineRoundedIcon from '@material-ui/icons/PersonOutlineRounded';

const useStyles = makeStyles<Theme>((theme: Theme) => ({
    paper: {
        backgroundColor: theme.palette.background.paper,
        padding: '2rem 4rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        [theme.breakpoints.down('sm')]: {
            padding: '1rem 2rem'
        }
    },
    text: {
        color: theme.palette.text.primary,
        marginBottom: '2rem'
    },
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
    button: {
        marginBottom: '2rem',
        minWidth: 300
    }
}))

const ProfilePage = () => {
    const classes = useStyles();
    const { appState, setAppState } = useContext(AppCtx);
    const { data: userData, loading } = useGetUser({ userId: appState.userId!, requestOptions: { headers: { access_token: localStorage.getItem('apiKey') ?? '' } } });
    const { mutate } = useUpdateUser({ userId: appState.userId!, requestOptions: { headers: { access_token: localStorage.getItem('apiKey') ?? '' } } });

    const handleSubmit = async (data: any) => {
        try {
            mutate(data);
        } catch (error) {
            console.error(error);
        }
    }
    if (!loading && userData && userData.birthDate)  {
        const [year, month, date] = userData.birthDate.split('-').map((value) => parseInt(value))
        return (
            <Paper className={classes.paper}>
                <SvgIcon className={classes.lockBackground}>
                    <PersonOutlineRoundedIcon className={classes.lockIcon} />
                </SvgIcon>
                <Typography className={classes.text} variant="h4">Mój profil</Typography>
                <RegisterForm handleSubmit={handleSubmit} defaultValues={{
                    name: userData.name,
                    surname: userData.surname,
                    mail: userData.mail,
                    phone: userData.phone,
                    birthDate: new Date(year, month, date)
                }} hiddenPassword={true}>
                    <Button className={classes.button} size="large" variant="outlined" color="primary">
                        Zmień hasło
                    </Button>
                    <Button className={classes.button} size="large" variant="outlined" color="primary">
                        Usuń konto
                    </Button>
                    <Button className={classes.button} size="large" variant="contained" color="primary" type="submit">
                        Zapisz zmiany
                    </Button>
                </RegisterForm>
            </Paper>
        )
    }
    return <div>loading</div>
}

export default ProfilePage
