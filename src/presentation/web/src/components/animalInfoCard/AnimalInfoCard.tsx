import React, { useEffect, useState } from 'react';
import { Paper, Typography, Table, TableBody, TableRow, TableCell } from '@material-ui/core';
interface AnimalInfoCardProps {
    animalId: number
}
const AnimalInfoCard = ({animalId: number}: AnimalInfoCardProps) => {
    return (
        <Paper>
            <Typography variant='h2'>Zenek</Typography>
            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell component="th">
                            <Typography variant='body2'>Nr ewidencyjny</Typography>
                        </TableCell>
                        <TableCell>
                        <Typography variant='subtitle2'>2</Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell component="th">
                            <Typography variant='body2'>W schronisku od</Typography> 
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