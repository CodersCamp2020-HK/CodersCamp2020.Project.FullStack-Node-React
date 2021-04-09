import React from 'react';
import { AdoptionStep, ApiError, useGetForm, usePostAnimalSubmission } from '../../../client/index';
import SurveyForm from '../SurveyForm/SurveyForm';
import Grid from '@material-ui/core/Grid';
import { UseGetReturn } from 'restful-react';

interface Props {
    formData: UseGetReturn<AdoptionStep, ApiError | Error, void, unknown>;
    handleSubmit: (data: any) => void;
}

const Form: React.FC<Props> = ({ formData, handleSubmit }) => {
    const { data, loading, error } = formData;

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

export default Form
