import React from 'react';
import { Button, createMuiTheme, Paper, TextField, Theme, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { useForm } from "react-hook-form";

const themes = createMuiTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 800,
            lg: 1000,
            xl: 1275,
        },
    },
});

const useStyles = makeStyles((theme: Theme) => ({
    mainPaper: {
        variant: "outlined",
        backgroundColor: theme.palette.background.paper,
    },
    mainHeader: {
        textAlign: 'center',
        marginBottom: '3rem',
        [themes.breakpoints.down('sm')]: {
            marginBottom: '1.5rem'
        }
    },
    normalText: {
        textAlign: 'left',
        marginBottom: '1rem',
        [themes.breakpoints.down('sm')]: {
            textAlign: 'center'
        }
    },
    description: {
        textAlign: 'left',
        marginBottom: '2rem',
        [theme.breakpoints.down('sm')]: {
            marginBottom: '1rem',
        }
    },
    textField: {
        '& .MuiFormHelperText-root': {
            position: 'absolute',
            paddingBottom: 10,
            bottom: 0
        },
        paddingBottom: 30,
        position: 'relative'
    },
    buttonsWrapper: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginBottom: '1rem',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
        },
    },
    checkButton: {
        display: 'flex',
        backgroundColor: theme.palette.primary.main,
        maxWidth: 300,
        minWidth: 250,
        marginRight: 30,
        [theme.breakpoints.down('sm')]: {
            marginRight: 0,
            marginBottom: '2rem',
        },
    },
    searchButton: {
        display: 'flex',
        maxWidth: 300,
        minWidth: 250,
        [theme.breakpoints.down('sm')]: {
            marginBottom: '2rem',
        },
    },
}));

interface Props {
    title?: string;
    description?: string;
    handleSubmit: (inputs: Inputs) => Promise<void>;
}

export interface Inputs {
    numerEwidencyjny: number;
}

const AdoptionApplicationFirstStep: React.FC<Props> = ({ children, title, description, handleSubmit: submitCb }) => {
    const classes = useStyles();
    const { register, handleSubmit, errors } = useForm<Inputs>();
    const onSubmit = async (data: Inputs) => {
        try {
            submitCb(data)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <Typography className={classes.normalText} variant="subtitle1">
                Wpisz numer ewidencyjny zwierzęcia
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <TextField
                    className={classes.textField}
                    name='numerEwidencyjny'
                    inputRef={register({ required: 'To pole jest wymagane', pattern: { value: /\d+/, message: 'Numer ewidencyjny to liczba' } })}
                    error={errors.hasOwnProperty('numerEwidencyjny')}
                    helperText={errors.numerEwidencyjny && errors.numerEwidencyjny.message}
                    required
                    variant="outlined"
                    size="medium"
                    color="secondary"
                    label="Nr ewidencyjny">
                </TextField>
                <div className={classes.buttonsWrapper}>
                    <Button
                        className={classes.checkButton}
                        variant="contained"
                        size="large"
                        type="submit"
                        color="primary">SPRAWDŹ</Button>
                    <Button
                        className={classes.searchButton}
                        variant="outlined"
                        size="large"
                        type="submit"
                        color="primary">WYSZUKAJ ZWIERZAKA</Button>
                </div>
            </form>
            <Typography className={classes.mainHeader} variant="h4">
                {title}
            </Typography>
            <Typography className={classes.description} variant="body1">
                {description}
            </Typography>
            {children}
        </>
    )
}

export default AdoptionApplicationFirstStep;