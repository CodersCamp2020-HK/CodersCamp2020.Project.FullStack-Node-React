import React, { useEffect, useState } from 'react';
import { Paper, Typography, Table, TableBody, TableRow, TableCell } from '@material-ui/core';
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
            <Typography variant='h2'>Zenek</Typography>
            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell component="th">
                            <Typography variant='body2'>Nr ewidencyjny:</Typography>
                        </TableCell>
                        <TableCell>
                        <Typography variant='subtitle2'>2</Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell component="th">
                            <Typography variant='body2'>W schronisku od:</Typography> 
                        </TableCell>
                        <TableCell>
                            <Typography variant='subtitle2'>29/04/2021</Typography>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </Paper>
    )
}

export default AnimalInfoCard;