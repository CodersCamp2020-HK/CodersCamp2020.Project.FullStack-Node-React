import { CircularProgress, makeStyles } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles({
    wrapper: {
        marginTop: 40,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

const LoadingCircle = ({size}: {size?: number | string}) => {
    const styles = useStyles();
    return (
        <div className={styles.wrapper}>
            <CircularProgress size={size} />
        </div>
    )
}

export default LoadingCircle;