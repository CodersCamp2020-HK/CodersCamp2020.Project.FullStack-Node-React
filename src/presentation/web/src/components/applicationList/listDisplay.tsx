import { makeStyles, Paper, Theme } from '@material-ui/core';
import React from 'react';
import { FormAnimalSubmission, useGetAnimalSubmissionByAnimalId } from '../../client';
import useQuery from '../../utils/UseQuery';
import ListOfApplications from './applicationLists';

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

    const shorterListData = ( data: FormAnimalSubmission[] ) => {
        if (data)
        return data.map((oneSubmission, index) => ({
            dateOfSubmission: oneSubmission.submissionDate,
            name: oneSubmission.applicant.name,
            surname: oneSubmission.applicant.surname,
            applicationNumber: oneSubmission.answers[0].question.form.id,
        }))
    };
    const dataToProps: ListData[] = shorterListData(listData as FormAnimalSubmission[]) as ListData[];

    const listDataMock: ListData[] = [
        {dateOfSubmission: '22/03/2022', name: 'Waldek', surname: 'Złoty', applicationNumber: 1},
        {dateOfSubmission: '22/03/2022', name: 'Waldek', surname: 'Złoty', applicationNumber: 2},
        {dateOfSubmission: '22/03/2022', name: 'Waldek', surname: 'Złoty', applicationNumber: 3},
    ];

    return(
        <Paper className={classes.mainWrapper}>
            {listData && <ListOfApplications listData={dataToProps}/>}
        </Paper>
    )  
};

export default ListDisplay;