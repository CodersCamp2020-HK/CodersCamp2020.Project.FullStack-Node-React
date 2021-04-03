import { Paper, Table, TableBody, TableCell, TableRow, Typography, Button } from '@material-ui/core';
import React from 'react';
import { useGetAllWillignessesToAdoptCount, useGetAnimal } from '../../client/index';
interface AnimalInfoCardProps {
    animalId: number;
}
const AnimalInfoCard = ({ animalId }: AnimalInfoCardProps) => {
    const { data: animal } = useGetAnimal({ animalId });
    const { data: aplicantNumber } = useGetAllWillignessesToAdoptCount({
        queryParams: {
            petName: animal?.name as string,
        },
    });
    let animalInfoRows;
    if (animal && aplicantNumber) {
        animalInfoRows = [
            {
                title: 'Nr ewidencyjny:',
                content: animal.id,
            },
            {
                title: 'W schronisku od:',
                content: animal.additionalInfo.admissionToShelter,
            },
            {
                title: 'Wielkość:',
                content: animal.additionalInfo.size,
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
                content: animal.age,
            },
            {
                title: 'Aktywność',
                content: animal.additionalInfo.activeLevel,
            },
            {
                title: 'Ilość aplikujących',
                content: aplicantNumber.count,
            },
        ];
    }
    return (
        <Paper>
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
            <Button variant='outlined' color='primary' size='medium'>Proces adopcyjny</Button>
            <Button variant='contained' color='primary' size='medium'>Adoptuj</Button>
        </Paper>
    );
};

export default AnimalInfoCard;
