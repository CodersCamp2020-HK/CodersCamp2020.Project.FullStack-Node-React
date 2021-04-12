import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AppCtx } from '../../App';

interface Props {
    component: React.FC;
}

const ProtectedRoute: React.FC<Props & React.ComponentProps<typeof Route>> = ({ component: Component, ...rest }) => {
    const appContext = useContext(AppCtx);
    return (
        <Route
            {...rest}
            render={(props) =>
                appContext.appState.userId !== null ? (
                    <Component />
                ) : (
                    <Redirect
                        to={{
                            pathname: '/auth',
                            state: {
                                from: props.location,
                            },
                        }}
                    />
                )
            }
        />
    );
};

export default ProtectedRoute;
