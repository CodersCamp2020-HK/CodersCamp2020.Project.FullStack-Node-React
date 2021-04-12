import React, { useContext } from 'react';
import { AnimalAnswer, PostAnimalSubmissionParams, useGetForm, usePostAnimalSubmission } from '../../client';
import useQuery from '../../utils/UseQuery';
import { useHistory } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import AdoptionApplicationFirstStep, { Inputs } from '../adoptionApplicationFirstStep/AdoptionApplicationFirstStep';
import { AppCtx } from '../../App';
import SideNav from '../navbar/sideNav/SideNav';

const pushAnswersToArray = (data: any, animalId: number, stepNumber: number) => {
    const answers: PostAnimalSubmissionParams = {
        animalId,
        stepNumber,
        answers: [],
    };
    for (const question in data) {
        const answer: AnimalAnswer = {
            questionId: parseInt(question.replace('question', '')),
            answer: {
                type: data[question].type,
                answer: data[question].answer,
            },
        };
        answers.answers.push(answer);
    }
    return answers;
}

const FirstStep = () => {
    const { appState } = useContext(AppCtx);
    const history = useHistory();
    const id = useQuery().get('id');

    const { role, userName } = appState;
    const animalId = id ? parseInt(id) : 1;

    const { data, refetch } = useGetForm({ animalId, lazy: !id, requestOptions: { headers: { access_token: localStorage.getItem('apiKey') ?? '' } } });
    const { mutate: postSubmission } = usePostAnimalSubmission({
        requestOptions: { headers: { access_token: localStorage.getItem('apiKey') ?? '' } },
    });
    console.log(data)

    const handleIdSubmit = async ({ numerEwidencyjny: id }: Inputs) => {
        try {
            refetch({ pathParams: { animalId: id } })
            history.push(`?id=${id}`);
        } catch (error) {
            console.log(error)
        }
    }
    const handleFormSubmit = async (formData: any) => {
        try {
            if (data) {
                const answers: PostAnimalSubmissionParams = pushAnswersToArray(formData, animalId, data.number);
                await postSubmission(answers);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Grid item lg={3}>
                <SideNav role={role!} name={userName!}/>
            </Grid>
            <Grid item lg>
                <AdoptionApplicationFirstStep description={data?.description} title={data?.name} handleSubmit={handleIdSubmit}>
                </AdoptionApplicationFirstStep>
            </Grid>
        </>
    )
}

export default FirstStep
