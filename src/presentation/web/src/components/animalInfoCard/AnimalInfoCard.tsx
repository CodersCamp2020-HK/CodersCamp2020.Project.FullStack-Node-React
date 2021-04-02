import { Paper, Table, TableBody, TableCell, TableRow, Typography } from '@material-ui/core';
import React from 'react';
import { useGetAnimal, useGetAllWillignessesToAdoptCount } from '../../client/index'
interface AnimalInfoCardProps {
    animalId: number
}
const AnimalInfoCard = ({animalId}: AnimalInfoCardProps) => {
    const {data: animal} = useGetAnimal({animalId})
    const {data: aplicantNumber} = useGetAllWillignessesToAdoptCount({petName: animal.name})
    let animalInfoRows;
    if(animal) {
        animalInfoRows = [{
            title: 'Nr ewidencyjny:',
            content: animal.id
        },
        {
            title: 'W schronisku od:',
            content: '29/04/2021'
        },
        {
            title: 'Wielkość:',
            content: 'mały'
        },
        {
            title: 'Akceptuje dzieci:',
            content: animal.acceptKids ? 'tak' : 'nie'
        },
        {
            title: 'Akceptuje zwierzęta:',
            content: animal.acceptAnimals ? 'tak' : 'nie'
        },
        {
            title: 'Wiek:',
            content:  animal.age
        },
        {
            title: 'Aktywność',
            content: 'bardzo duża'
        },
        {
            title: 'Ilość aplikujących',
            content: aplicantNumber.count
        },
    ]
    }
    return (
        <Paper>
            <Typography style={{textAlign: 'center'}} variant='h2'>Zenek</Typography>
            <Table>
                <TableBody>
                    {animalInfoRows && animalInfoRows.map((singleRow, index) =>
                        <TableRow key={index}>
                            <TableCell component="th">
                                <Typography variant='body2'>{singleRow.title}</Typography> 
                            </TableCell>
                            <TableCell>
                                <Typography variant='subtitle2'>{singleRow.content}</Typography>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </Paper>
    )
}

export default AnimalInfoCard;