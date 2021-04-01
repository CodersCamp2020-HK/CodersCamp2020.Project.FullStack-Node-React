import React from 'react'
import { Route, Switch, useRouteMatch, Redirect } from 'react-router-dom';
import AnimalForm from '../components/forms/AnimalForm';


const FormRoute = () => {
    const { path } = useRouteMatch();
    
    return (
        <Switch>
            <Route exact path={`${path}/`} >
                <AnimalForm />
            </Route>
            <Redirect to={`/404/${path}`} />
        </Switch>
    )
}

export default FormRoute
