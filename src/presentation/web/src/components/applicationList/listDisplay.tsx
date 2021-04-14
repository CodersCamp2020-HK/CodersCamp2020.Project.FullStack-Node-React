import React from 'react';
import { makeStyles, Paper } from '@material-ui/core';
import ListOfApplications from './applicationLists';
import useQuery from '../../utils/UseQuery';
import { useGetAnimalSubmissionByAnimalId } from '../../client';

// const useStyle = makeStyles((theme: Theme) => ({
//     mainWrapper: {
//         width: '100%',
//         display: 'flex',
//         flexDirection: 'column',
//         justifyContent: 'center',
//         alignItems: 'center',
//         padding: '2rem 0'
//     },
// }))

export interface ListData{
    dateOfSubmission: string,
    name: string,
    surname: string,
    applicationNumber: number,
};

const ListDisplay = () => {
    // const classes = useStyle();
    const id = useQuery().get('id');
    const requestOptions = { headers: { access_token: localStorage.getItem('apiKey') ?? '' } };

    const animalId = id ? parseInt(id) : 1;
    const { data: listData } = useGetAnimalSubmissionByAnimalId ({ animalId ,requestOptions });

    console.log(listData)

    const listDataMock: ListData[] = [
        {dateOfSubmission: '22/03/2022', name: 'Waldek', surname: 'Złoty', applicationNumber: 1},
        {dateOfSubmission: '22/03/2022', name: 'Waldek', surname: 'Złoty', applicationNumber: 2},
        {dateOfSubmission: '22/03/2022', name: 'Waldek', surname: 'Złoty', applicationNumber: 3},
    ];
    // console.log(listDataMock)

    return(
        <Paper>
            <ListOfApplications listData={listDataMock}/>
        </Paper>
    )  
};

export default ListDisplay;