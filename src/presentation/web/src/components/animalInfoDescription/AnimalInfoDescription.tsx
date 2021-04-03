import { makeStyles, Paper, Theme, Typography } from '@material-ui/core';
import React from 'react';
import { useGetAnimal } from '../../client/index';
interface AnimalInfoDescriptionProps {
    animalId: number;
}

const useStyles = makeStyles((theme: Theme) => ({
    paper: {
        padding: theme.spacing(2),
    },
}));

const AnimalInfoDescription = ({ animalId }: AnimalInfoDescriptionProps) => {
    const { data: animal } = useGetAnimal({ animalId });
    const styles = useStyles();
    return (
        <Paper className={styles.paper}>
            <Typography variant="body2">{animal && animal.description}</Typography>
        </Paper>
    );
};

export default AnimalInfoDescription;
