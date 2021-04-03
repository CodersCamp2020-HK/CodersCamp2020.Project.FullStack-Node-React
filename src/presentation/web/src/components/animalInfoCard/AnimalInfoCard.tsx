import { Button, makeStyles, Paper, Table, TableBody, TableCell, TableRow, Theme, Typography } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router';
import { AnimalActiveLevel, AnimalSize, useGetAllWillignessesToAdoptCount, useGetAnimal } from '../../client/index';
interface AnimalInfoCardProps {
    animalId: number;
}

const formatDate = (date: string): string => {
    const givenDate = new Date(date);

    if (!givenDate.getFullYear()) {
        return 'Brak informacji';
    }

    const day = givenDate.getDate();
    const month = givenDate.getMonth() + 1;
    const year = givenDate.getFullYear();

    return `${day < 10 ? '0' + day : day}/${month < 10 ? '0' + month : month}/${year}`;
};

const formatSize = (size: AnimalSize): string => {
    if (size === 'small') return 'mały';
    if (size === 'medium') return 'średni';
    if (size === 'large') return 'duży';
    return 'nieznany';
};

const formatActiveLevel = (activeLevel: AnimalActiveLevel): string => {
    if (activeLevel === 'low') return 'niska';
    if (activeLevel === 'medium') return 'umiarkowana';
    if (activeLevel === 'high') return 'wysoka';
    return 'nieznana';
};

const ADOPTION_PROCESS_PAGE = 'adoption-process';
const ADOPT_PAGE = 'adopt';

const useStyles = makeStyles((theme: Theme) => ({
    paper: {
        padding: theme.spacing(3),
        display: 'flex',
        flexDirection: 'column',
    },
    button: {
        marginTop: theme.spacing(2),
    },
}));

const AnimalInfoCard = ({ animalId }: AnimalInfoCardProps) => {
    const history = useHistory();
    const { data: animal } = useGetAnimal({ animalId });
    const { data: aplicantNumber } = useGetAllWillignessesToAdoptCount({
        queryParams: {
            petName: animal?.name as string,
        },
    });
    const styles = useStyles();
    let animalInfoRows;
    if (animal && aplicantNumber) {
        animalInfoRows = [
            {
                title: 'Nr ewidencyjny:',
                content: animal.id,
            },
            {
                title: 'W schronisku od:',
                content: formatDate(animal.additionalInfo.admissionToShelter),
            },
            {
                title: 'Wielkość:',
                content: formatSize(animal.additionalInfo.size),
            },
            {
                title: 'Akceptuje dzieci:',
                content: animal.additionalInfo.acceptsKids ? 'tak' : 'nie',
            },
            {
                title: 'Akceptuje zwierzęta:',
                content: animal.additionalInfo.acceptsOtherAnimals ? 'tak' : 'nie',
            },
            {
                title: 'Wiek:',
                content: animal.age + ' msc.',
            },
            {
                title: 'Aktywność:',
                content: formatActiveLevel(animal.additionalInfo.activeLevel),
            },
            {
                title: 'Ilość aplikujących:',
                content: aplicantNumber.count,
            },
        ];
    }
    return (
        <Paper className={styles.paper}>
            <Typography style={{ textAlign: 'center' }} variant="h2">
                {animal && animal.name}
            </Typography>
            <Table>
                <TableBody>
                    {animalInfoRows &&
                        animalInfoRows.map((singleRow, index) => (
                            <TableRow key={index}>
                                <TableCell component="th">
                                    <Typography variant="body2">{singleRow.title}</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="subtitle2">{singleRow.content}</Typography>
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
            <Button
                onClick={() => history.push(ADOPTION_PROCESS_PAGE)}
                variant="outlined"
                color="primary"
                size="medium"
                className={styles.button}
            >
                Proces adopcyjny
            </Button>
            <Button
                onClick={() => history.push(`${ADOPT_PAGE}?id=${animalId}`)}
                variant="contained"
                color="primary"
                size="medium"
                className={styles.button}
            >
                Adoptuj
            </Button>
        </Paper>
    );
};

export default AnimalInfoCard;
