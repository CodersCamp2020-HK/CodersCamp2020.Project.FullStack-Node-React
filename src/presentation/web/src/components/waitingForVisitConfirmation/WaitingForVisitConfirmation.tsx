import { Avatar, makeStyles, Theme, Typography } from '@material-ui/core';
import { HourglassEmpty } from '@material-ui/icons';
import { format } from 'date-fns';
import React from 'react';

interface WaitingForVisitConfirmationProps {
    acceptedFormDate: Date;
    endingDateToChooseVisit: Date;
    acceptingWorkerName: string;
}

const useStyles = makeStyles((theme: Theme) => ({
    wrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    text: {
        marginTop: theme.spacing(1),
    },
    avatar: {
        backgroundColor: theme.palette.secondary.dark,
    },
}));

const WaitingForVisitConfirmation = ({ acceptedFormDate, acceptingWorkerName, endingDateToChooseVisit }: WaitingForVisitConfirmationProps) => {
    const styles = useStyles();
    return (
        <div className={styles.wrapper}>
            <Avatar className={styles.avatar}>
                <HourglassEmpty />
            </Avatar>
            <Typography variant="h5">Oczekiwanie na potwierdzenie wizyty przez składającego wniosek.</Typography>
            <Typography className={styles.text} variant="subtitle1">Data zaakceptowania wniosku adopcyjnego:</Typography>
            <Typography variant="h6">{format(acceptedFormDate, 'dd/MM/yyyy, HH:mm')}</Typography>
            <Typography  className={styles.text}  variant="subtitle1">Pracownik akceptujący wniosek:</Typography>
            <Typography variant="h6">{acceptingWorkerName}</Typography>
            <Typography  className={styles.text}  variant="subtitle1">Data końcowa na wybranie terminu spotkania w schronisku przez skłądającego wniosek:</Typography>
            <Typography variant="h6">{format(endingDateToChooseVisit, 'dd/MM/yyyy, HH:mm')}</Typography>
        </div>
    );
};

export default WaitingForVisitConfirmation;
