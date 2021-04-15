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
    animalId: number,
    submissionId: number,
};

const ListDisplay = () => {
    const classes = useStyle();
    const id = useQuery().get('id');
    const requestOptions = { headers: { access_token: localStorage.getItem('apiKey') ?? '' } };

    const animalId = id ? parseInt(id) : 2;
    const { data: listData } = useGetAnimalSubmissionByAnimalId ({ animalId ,requestOptions });

    console.log(listData);
    const shorterListData = ( data: FormAnimalSubmission[] ) => {
        if (data)
        return data.map((oneSubmission, index) => ({
            dateOfSubmission: oneSubmission.submissionDate,
            name: oneSubmission.applicant.name,
            surname: oneSubmission.applicant.surname,
            applicationNumber: oneSubmission.answers[0].question.form.id,
            animalId,
            submissionId: oneSubmission.id,

        }))
    };
    const dataToProps: ListData[] = shorterListData(listData as FormAnimalSubmission[]) as ListData[];

    return(
        <Paper className={classes.mainWrapper}>
            {listData && <ListOfApplications listData={dataToProps}/>}
        </Paper>
    )  
};

export default ListDisplay;