import React, { useState } from 'react';
import { Button, createMuiTheme, Paper, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import theme from '../../themes/theme';
import { useGetForm } from "../../client/index";
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

const useStyles = makeStyles({
    mainPaper: {
        variant: "outlined",
        backgroundColor: theme.palette.background.paper,
    },
    mainHeader: {
        textAlign: 'center',
        margin: '2%',
    },
    normalText: {
        textAlign: 'left',
        margin: '3%',
    },
    textFieldWrapper: {
        [themes.breakpoints.down('sm')]: {
            '& .MuiFormHelperText-root': {
                position: 'absolute',
                paddingBottom: 0,
                bottom: 0
            },
            paddingBottom: 25,
            position: 'relative'
        },
    },
    formWrapper: {
        padding: '0% 3% 0% 3%',
    },
    buttonsWrapper: {
        margin: '3% 3% 3% 3%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 20%',
        [themes.breakpoints.down('sm')]: {
            flexDirection: 'column',
        },
    },
    checkButton: {
        display: 'flex',
        backgroundColor: theme.palette.primary.main,
        width: '300px',
        [themes.breakpoints.down('sm')]: {
            marginBottom: '15%',
            position: 'relative',
        },
    },
    searchButton: {
        display: 'flex',
        width: '300px',
        [themes.breakpoints.down('sm')]: {
            marginBottom: '10%',
            position: 'relative',
        },
    },
});

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
        <Paper className={classes.mainPaper} variant="outlined">
            <Typography className={classes.mainHeader} variant="h4">
                {title}
            </Typography>
            {children}
            <Typography className={classes.normalText} variant="body1">
                {description}
            </Typography>
            <div>
                <Typography className={classes.normalText} variant="subtitle1">
                    Wpisz numer ewidencyjny zwierzęcia
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)} noValidate className={classes.formWrapper}>
                    <TextField
                        className={classes.textFieldWrapper}
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
            </div>
        </Paper>
    )
}

export default AdoptionApplicationFirstStep;