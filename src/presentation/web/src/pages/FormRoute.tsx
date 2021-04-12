import React from 'react';
import { Route, Switch, useRouteMatch, Redirect } from 'react-router-dom';
import { AnimalAnswer, PostAnimalSubmissionParams, useGetForm, usePostAnimalSubmission } from '../client';
import SurveyForm from '../components/forms/surveyForm/SurveyForm';
import GridContainer from '../components/gridContainer/GridContainer';

const FormRoute = () => {
    const animalId = 1;
    const stepNumber = 1;
    const { path } = useRouteMatch();
    const animalFormData = useGetForm({
        animalId,
        requestOptions: { headers: { access_token: localStorage.getItem('apiKey') ?? '' } },
    });
    const { mutate: postSubmission } = usePostAnimalSubmission({
        requestOptions: { headers: { access_token: localStorage.getItem('apiKey') ?? '' } },
    });
    const handleSubmit = async (data: any) => {
        try {
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
            await postSubmission(answers);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <GridContainer spacing={2} align="center" justify="center">
            <Switch>
                <Route exact path={`${path}/`}>
                    <SurveyForm formData={animalFormData} handleSubmit={handleSubmit} />
                </Route>
                <Redirect to={`/404/${path}`} />
            </Switch>
        </GridContainer>
    );
};

export default FormRoute;
