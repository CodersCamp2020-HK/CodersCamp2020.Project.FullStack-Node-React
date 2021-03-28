import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Theme, useTheme, makeStyles } from '@material-ui/core';
import LockIcon from '../lockIcon/LockIcon';

interface Props {
    typographyLabel: string;
}

const AuthPaper: React.FC<Props> = ({ typographyLabel, children}) => {
    const theme = useTheme<Theme>();
    const useStyle = makeStyles({
        paper: {
            color: theme.palette.background.paper,
            margin: '3rem 0',
            padding: '20px 50px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center'
        },
        text: {
            color: theme.palette.text.primary,
            marginBottom: 35
        }
    })
    const classes = useStyle();

    return (
        <Paper className={classes.paper} variant="outlined" square={false}>
            <LockIcon />
            <Typography className={classes.text} variant="h5" component="span">{typographyLabel}</Typography>
            {children}
        </Paper>
    )
}

export default AuthPaper
