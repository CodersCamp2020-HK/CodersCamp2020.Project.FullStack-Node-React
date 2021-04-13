import { CircularProgress, makeStyles, Theme } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme: Theme) => ({
    circle: {
        marginLeft: theme.spacing(8),
    },
}));

const LoadingCircleSmall = ({ size }: { size?: number | string }) => {
    const styles = useStyles();
    return <CircularProgress className={styles.circle} size={size} />;
};

export default LoadingCircleSmall;
