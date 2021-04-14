import { makeStyles, Paper, Theme, Typography } from '@material-ui/core';
import React from 'react';
import { useGetAnimal } from '../../client/index';
import LoadingCircle from '../loadingCircle/LoadingCircle';
interface AnimalInfoDescriptionProps {
    animalId: number;
}

const useStyles = makeStyles((theme: Theme) => ({
    paper: {
        padding: theme.spacing(3),
    },
}));

const AnimalInfoDescription = ({ animalId }: AnimalInfoDescriptionProps) => {
    const { data: animal, loading } = useGetAnimal({ animalId });
    const styles = useStyles();
    return (
        <Paper className={styles.paper}>
             {loading && <LoadingCircle size={70} />}
            <Typography data-testid='desc' variant="body2">{animal && animal.description}</Typography>
        </Paper>
    );
};

export default AnimalInfoDescription;
