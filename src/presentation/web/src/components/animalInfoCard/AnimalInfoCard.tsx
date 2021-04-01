import { Paper, Table, TableBody, TableCell, TableRow, Typography } from '@material-ui/core';
import React from 'react';
interface AnimalInfoCardProps {
    animalId: number
}
const AnimalInfoCard = ({animalId: number}: AnimalInfoCardProps) => {
    const animalInfoRows = [{
        title: 'Nr ewidencyjny:',
        content: '2'
    },
    {
        title: 'W schronisku od:',
        content: '25/09/2021'
    },
    {
        title: 'Wielkość:',
        content: 'mały'
    },
    {
        title: 'Akceptuje dzieci:',
        content: 'tak'
    },
    {
        title: 'Akceptuje zwierzęta:',
        content: 'nie'
    },
    {
        title: 'Wiek:',
        content: '3'
    },
    {
        title: 'Aktywność',
        content: 'bardzo duża'
    },
    {
        title: 'Ilość aplikujących',
        content: '10'
    },
]
    return (
        <Paper>
            <Typography style={{textAlign: 'center'}} variant='h2'>Zenek</Typography>
            <Table>
                <TableBody>
                    {animalInfoRows.map((singleRow, index) =>
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