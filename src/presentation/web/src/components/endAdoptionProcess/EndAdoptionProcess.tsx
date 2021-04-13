import React from 'react';
import {Typography, Avatar, makeStyles, Theme} from '@material-ui/core';
import { Check } from '@material-ui/icons';

interface EndAdoptionProcessProps {
    submissionWorkerName: string;
    date: Date;
    adoptionWorkerName: string;
}

const useStyles = makeStyles((theme: Theme) => ({
    wrapper: {
        display: 'flex',
        flexDirection: 'column',
    },
    text: {
        marginTop: theme.spacing(8),
    }
}))

const EndAdoptionProcess = ({submissionWorkerName, date, adoptionWorkerName}: EndAdoptionProcessProps) => {
    const styles = useStyles();
    return (
        <div className={styles.wrapper}>
            <Check />
            <Typography variant='h5'>Zakończenie procesu adopcyjnego?</Typography>
            <Typography variant='h6'>Pracownik akceptujący wniosek adopcyjny:</Typography>
            <Typography variant='h6'>{submissionWorkerName}</Typography>
            <Typography variant='h6'>Data spotkania w schronisku</Typography>
            <Typography variant='h6'>{date}</Typography>
            <Typography variant='h6'>Pracownik akceptujący całą adopcję:</Typography>
            <Typography variant='h6'>{adoptionWorkerName}</Typography>
        </div>
    )
}