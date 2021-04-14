import React from 'react';
import { makeStyles, Paper, Theme } from '@material-ui/core';
import ListOfApplications from './applicationLists';
import useQuery from '../../utils/UseQuery';
import { useGetAnimalSubmissionByAnimalId, UseGetAnimalSubmissionByAnimalIdProps } from '../../client';

const useStyle = makeStyles((theme: Theme) => ({
    mainWrapper: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem 0'
    },
}))

export interface ListData{
    dateOfSubmission: string,
    name: string,
    surname: string,
    applicationNumber: number,
};

const ListDisplay = () => {
    const classes = useStyle();
    const id = useQuery().get('id');
    const requestOptions = { headers: { access_token: localStorage.getItem('apiKey') ?? '' } };

    const animalId = id ? parseInt(id) : 2;
    const { data: listData } = useGetAnimalSubmissionByAnimalId ({ animalId ,requestOptions });

    console.log(listData);
    // if (listData) console.log(listData[0].answers[0].question.form.id);
    // if (listData) console.log(listData[0].applicant.name);
    // if (listData) console.log(listData[0].applicant.surname);
    // if (listData) console.log(listData[0].submissionDate)

    // const shorterListData = ( data: UseGetAnimalSubmissionByAnimalIdProps[] ) => {
    //     if (data)
    //     return data.map((one, index) => ({
    //         dateOfSubmission: one[index].submissionDate,
    //         name: one[index].applicant.name,
    //         surname: one[index].applicant.surname,
    //         applicationNumber: one[index].answers[0].question.form.id,
    //     }))
    // };
    // var result = arr.map(person => ({ value: person.id, text: person.name }));
    // console.log(result)
    // const dataToProps = shorterListData(listData);

    const listDataMock: ListData[] = [
        {dateOfSubmission: '22/03/2022', name: 'Waldek', surname: 'Złoty', applicationNumber: 1},
        {dateOfSubmission: '22/03/2022', name: 'Waldek', surname: 'Złoty', applicationNumber: 2},
        {dateOfSubmission: '22/03/2022', name: 'Waldek', surname: 'Złoty', applicationNumber: 3},
    ];

    return(
        <Paper className={classes.mainWrapper}>
            {listData && <ListOfApplications listData={listDataMock}/>}
        </Paper>
    )  
};

export default ListDisplay;