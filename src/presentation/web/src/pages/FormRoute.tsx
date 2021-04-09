import React from 'react'
import { Route, Switch, useRouteMatch, Redirect } from 'react-router-dom';
import { AnimalAnswer, PostAnimalSubmissionParams, useGetForm, usePostAnimalSubmission } from '../client';
import Form from '../components/forms/Form/Form';

const FormRoute = () => {
    const animalId = 1;
    const stepNumber = 1;
    const { path } = useRouteMatch();
    const animalFormData = useGetForm({ animalId, requestOptions: { headers: { access_token: localStorage.getItem('apiKey') ?? '' }} });
    const { mutate: postSubmission } = usePostAnimalSubmission({});
    const handleSubmit = (data: any) => {
        console.log(data);
        const answers: PostAnimalSubmissionParams = {
            animalId,
            stepNumber,
            answers: []
        };
        for (const question in data) {
            // const answer: AnimalAnswer = {
            //     questionId: parseInt(question.replace('question', '')),
            //     answer: {
            //         type: animalFormData.data?.form?.questions.
            //     }
            // }
            console.log(question.replace('question', ''), data[question]);
        }
        console.log('Skuces');
    }
    
    return (
        <Switch>
            <Route exact path={`${path}/`} >
                <Form formData={animalFormData} handleSubmit={handleSubmit} />
            </Route>
            <Redirect to={`/404/${path}`} />
        </Switch>
    )
}

export default FormRoute
