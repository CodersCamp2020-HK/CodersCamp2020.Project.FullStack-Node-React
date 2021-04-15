import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { ListData } from './listDisplay';
import { Button } from '@material-ui/core';

interface Props{
    listData: ListData[],
};

const useStyles = makeStyles((theme: Theme) => ({
    table: {
      minWidth: 650,
    },
    button: {
      background: theme.palette.secondary.main,
      color: '#FFF',
      borderRadius: 21,
    }
  }));

function createData(dateOfSubmission: string, name: string, surname: string, applicationNumber: number, animalId: number, submissionId: number) {
    return { dateOfSubmission, name, surname, applicationNumber, submissionId, animalId };
  }
  
const Rows = ( props: Props ) => {
      return props.listData.map((prop) => {
        return (createData(prop.dateOfSubmission, prop.name, prop.surname, prop.applicationNumber, prop.animalId, prop.submissionId, ));
        })
    };

const showApplication = (animalId: number, submissionId: number) => {
  console.log('Animal id: ', animalId)
  console.log('Submission id: ', submissionId)
}    

const ListOfApplications = (props:Props) => {
    const classes = useStyles();
    const rows = Rows(props);

    return (
    <Table className={classes.table} aria-label="simple table">
            <TableHead>
            <TableRow>
                <TableCell>Data złożenia wniosku: </TableCell>
                <TableCell align="right">Imię i nazwisko: </TableCell>
                <TableCell align="right">Numer wniosku</TableCell>
                <TableCell align="right"></TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {rows.map((row) => (
                <TableRow key={row.applicationNumber}>
                <TableCell component="th" scope="row">
                {row.dateOfSubmission}
                </TableCell>
                <TableCell align="right">{ row.name } { row.surname }</TableCell>
                <TableCell align="right">{ row.applicationNumber }</TableCell>
                <TableCell align="right">
                  <Button onClick={() => showApplication(row.animalId, row.submissionId)} className={classes.button}>Zobacz wniosek</Button>
                </TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
    )

  }

  export default ListOfApplications;