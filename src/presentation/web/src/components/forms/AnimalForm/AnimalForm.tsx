import React, { useEffect } from 'react';
import { useGetForm } from '../../../client/index';
import { useRouteMatch, Redirect } from 'react-router-dom';
import SurveyForm from '../SurveyForm/SurveyForm';
import Grid from '@material-ui/core/Grid';
import useQuery from '../../../utils/UseQuery';

const AnimalForm = () => {
    const query = useQuery();
    const id = query.get('animalId');
    console.log(id);
    const { data, loading } = useGetForm({ animalId: 1, requestOptions: { headers: { access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJpZCI6MSwiaWF0IjoxNjE3MzQ2NzYzfQ.h3t7y8edtFxLAm46FNOjpUaaVyvYhLCVBrqx68rOMfc' }} });
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
    return (
        <div>
            loading...
        </div>
    )
}

export default AnimalForm
