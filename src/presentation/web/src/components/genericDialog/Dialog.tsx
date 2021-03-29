import {
    Button,
    Dialog as MuiDialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Theme,
    useTheme,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { useState } from 'react';

interface DialogProps {
    isOpen: boolean;
    title: string;
    content: string;
    actionText: string;
}

const Dialog = ({ isOpen, title, content, actionText }: DialogProps) => {
    const [open, setOpen] = useState<boolean>(isOpen);
    const theme = useTheme<Theme>();
    const useStyles = makeStyles({
        paper: {
            padding: theme.spacing(2),
        },
        buttons: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
        },
    });

    const classes = useStyles();
    return (
        <MuiDialog classes={{paper: classes.paper}} open={open} maxWidth="sm">
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>{content}</DialogContent>
            <DialogActions className={classes.buttons}>
                <Button fullWidth variant="outlined" color="primary" onClick={() => setOpen(false)}>
                    Powrót
                </Button>
                <Button fullWidth variant="contained" color="primary">
                    {actionText}
                </Button>
            </DialogActions>
        </MuiDialog>
    );
};

export default Dialog;
