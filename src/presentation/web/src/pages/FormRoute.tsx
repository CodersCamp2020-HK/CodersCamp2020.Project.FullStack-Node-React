import React from 'react'
import { Route, Switch, useRouteMatch, Redirect } from 'react-router-dom';
import { useGetForm } from '../client';
import AnimalForm from '../components/forms/AnimalForm/AnimalForm';


const FormRoute = () => {
    const { path } = useRouteMatch();
    const animalFormData = useGetForm({ animalId: 1, requestOptions: { headers: { access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJpZCI6MSwiaWF0IjoxNjE3MzQ2NzYzfQ.h3t7y8edtFxLAm46FNOjpUaaVyvYhLCVBrqx68rOMfc' }} });
    const handleSubmit = (data: any) => {
        console.log(data);
        console.log('Skuces');
    }
    
    return (
        <Switch>
            <Route exact path={`${path}/`} >
                <AnimalForm formData={animalFormData} handleSubmit={handleSubmit} />
            </Route>
            <Redirect to={`/404/${path}`} />
        </Switch>
    )
}

export default FormRoute
