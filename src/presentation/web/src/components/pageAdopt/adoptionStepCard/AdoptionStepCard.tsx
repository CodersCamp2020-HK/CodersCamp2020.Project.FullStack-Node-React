import React from 'react';
import { Theme, Typography, Paper, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

interface Props {
    id: number;
    color: string;
    title: string;
    description: string;
}

const useStyle = makeStyles((theme: Theme) => ({
    wrapper: {
        display: 'flex',
        padding: '25px',
    },
    circle: {
        width: '80px',
        height: '80px',
        backgroundColor: (props: Props) =>
            props.color === 'primary' ? `${theme.palette.primary.main}14` : `${theme.palette.secondary.main}14`,
        borderRadius: '50%',
        marginRight: theme.spacing(3),
    },
    number: {
        position: 'relative',
        top: '-10px',
        color: (props: Props) =>
            props.color === 'primary' ? theme.palette.primary.dark : theme.palette.secondary.dark,
    },
    title: {
        color: (props: Props) =>
            props.color === 'primary' ? theme.palette.primary.dark : theme.palette.secondary.dark,
    },
    description: {
        color: (props: Props) =>
            props.color === 'primary' ? theme.palette.primary.dark : theme.palette.secondary.dark,
    },
    textWrapper: {
        width: '100%',
    },
    divider: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        width: '100%',
    },
}));

const AdoptionStepCard = (props: Props) => {
    const { id, color, description, title } = props;
    const classes = useStyle(props);

    return (
        <Paper variant="outlined" className={classes.wrapper}>
            <div className={classes.circle}>
                <Typography variant="h3" align="center" className={classes.number}>
                    {`0${id}`}
                </Typography>
            </div>
            <div className={classes.textWrapper}>
                <Typography variant="h5" className={classes.title}>
                    {title}
                </Typography>
                <Divider className={classes.divider} />
                <Typography variant="body2" className={classes.description}>
                    {description}
                </Typography>
            </div>
        </Paper>
    );
};

export default AdoptionStepCard;
