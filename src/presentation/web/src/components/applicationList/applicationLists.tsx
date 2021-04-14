import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { ListData } from './listDisplay';

interface Props{
    dataList: ListData[],
};

const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });

function createData(dateOfSubmission: string, name: string, surname: string, applicationNumber: number) {
    return { dateOfSubmission, name, surname, applicationNumber };
  }
  
const Rows = ( props: Props ) => {
      props.dataList.map((prop) => {
        return (createData(prop.dateOfSubmission, prop.name, prop.surname, prop.applicationNumber));
        })
    };

const ListOfApplications= (props:Props) => {
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
                </TableRow>
            ))}
            </TableBody>
        </Table>
    )

  }

  export default ListOfApplications;