import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { localTheme } from './LocalTheme';

const useStyles = makeStyles(
    createStyles({
        root: {
            width: 50,
            height: 50,
            borderRadius: '50%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
            backgroundColor: (props: Props) =>
                props.active ? localTheme.palette.primary.main : localTheme.palette.secondary.main,
            border: `1px solid ${localTheme.palette.primary.main}`,
            boxSizing: 'border-box',
        },
    }),
);

interface Props {
    active: boolean;
    children: JSX.Element;
}

const IconWrapper = (props: Props) => {
    const classes = useStyles(props);

    return <div className={classes.root}>{props.children}</div>;
};

export default IconWrapper;
