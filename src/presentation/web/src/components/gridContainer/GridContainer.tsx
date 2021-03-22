import React from 'react';
import Grid from '@material-ui/core/Grid';

const GridContainer: React.FC = (props: any) => {
    return (
        <Grid container justify="center" alignItems="center">
            {props.children}
        </Grid>
    );
};

export default GridContainer;
