import React from 'react';
import { useGetForm } from '../../../client/index';
import SurveyForm from '../SurveyForm/SurveyForm';
import Grid from '@material-ui/core/Grid';

interface Props {
    animalId: number;
    stepNumber: number;
}

const AnimalForm: React.FC<Props> = ({ animalId, stepNumber }) => {
    const { data, loading, error } = useGetForm({ animalId, requestOptions: { headers: { access_token: localStorage.getItem('apiKey') ?? '' }} });
    const handleSubmit = (data: any) => {
        console.log(data);
    }

    if (!loading && data && data.form) {
        return (
            <Grid item sm={12} lg={8}>
                <SurveyForm key='form' questions={data.form.questions} handleSubmit={handleSubmit} />
            </Grid>
        )
    }
    if (error) {
        return (
            <div>
                <p>{error.message}</p>
            </div>
        )
    }
    return (
        <div>
            loading...
        </div>
    )
}

export default AnimalForm
