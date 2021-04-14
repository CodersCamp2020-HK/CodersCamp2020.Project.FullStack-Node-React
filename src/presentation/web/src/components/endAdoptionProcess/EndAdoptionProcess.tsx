import { Avatar, makeStyles, Theme, Typography } from '@material-ui/core';
import { Check } from '@material-ui/icons';
import { format } from 'date-fns';
import React from 'react';

interface EndAdoptionProcessProps {
    submissionWorkerName: string;
    date: Date;
    adoptionWorkerName: string;
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

const EndAdoptionProcess = ({ submissionWorkerName, date, adoptionWorkerName }: EndAdoptionProcessProps) => {
    const styles = useStyles();
    return (
        <div className={styles.wrapper}>
            <Avatar className={styles.avatar}>
                <Check />
            </Avatar>
            <Typography variant="h5">Zakończenie procesu adopcyjnego?</Typography>
            <Typography className={styles.text} variant="subtitle1">Pracownik akceptujący wniosek adopcyjny:</Typography>
            <Typography variant="h6">{submissionWorkerName}</Typography>
            <Typography  className={styles.text}  variant="subtitle1">Data spotkania w schronisku</Typography>
            <Typography variant="h6">{format(date, 'dd/MM/yyyy, HH:mm')}</Typography>
            <Typography  className={styles.text}  variant="subtitle1">Pracownik akceptujący całą adopcję:</Typography>
            <Typography variant="h6">{adoptionWorkerName}</Typography>
        </div>
    );
};

export default EndAdoptionProcess;
