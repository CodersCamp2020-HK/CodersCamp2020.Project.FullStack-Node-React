import React, { useState } from 'react';
import { Button, Paper, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import theme from '../../themes/theme';
import { useGetForm } from "../../client/index";
import { useForm } from "react-hook-form";

const useStyles = makeStyles({
    mainPaper: {
        variant: "outlined",
        backgroundColor: theme.palette.background.paper,
    },
    mainHeader: {
        textAlign: 'center',
    },
    normalText: {

    },
    buttonIcon: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: theme.palette.primary.main,
    },
});



interface Props {
    title: string;
    description: string;
}
interface Inputs {
    numerEwidencyjny: number;
}

const AdoptionApplicationFirstStep: React.FC<Props> = ({ children, title, description }) => {
    const classes = useStyles();
    const { register, handleSubmit, errors } = useForm<Inputs>();
    const [numerEwidencyjny, setNumerEwidencyjny] = useState(1);
    const { data } = useGetForm({ animalId: numerEwidencyjny, requestOptions: { headers: { access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJpZCI6MSwiaWF0IjoxNjE3MzQ2NzYzfQ.h3t7y8edtFxLAm46FNOjpUaaVyvYhLCVBrqx68rOMfc' } } });
    console.log(data);
    const onSubmit = async ({ numerEwidencyjny: id }: Inputs) => {
        try {
            setNumerEwidencyjny(id)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <Paper
            className={classes.mainPaper}
            variant="outlined">
            <Typography
                className={classes.mainHeader}
                variant="h4">
                {title}
            </Typography>
            {children}
            <Typography
                className={classes.normalText}
                variant="body1">
                {description}
            </Typography>
            <Typography
                className={classes.normalText}
                variant="subtitle1">
                Wpisz numer ewidencyjny zwierzęcia
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
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
                <Button
                    className={classes.buttonIcon}
                    variant="contained"
                    size="large"
                    type="submit"
                    color="primary">SPRAWDŹ</Button>
            </form>
        </Paper>
    )
}

export default AdoptionApplicationFirstStep;