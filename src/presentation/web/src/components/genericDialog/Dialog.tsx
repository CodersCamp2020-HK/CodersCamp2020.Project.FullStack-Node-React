import { Button, Dialog as MuiDialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import React, { useState } from 'react';

interface DialogProps {
    isOpen: boolean;
    title: string;
    content: string;
    actionText: string;
}

const Dialog = ({ isOpen, title, content, actionText }: DialogProps) => {
    const [open, setOpen] = useState<boolean>(isOpen);
    return (
        <MuiDialog open={open} maxWidth="sm">
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>{content}</DialogContent>
            <DialogActions>
                <Button variant='outlined' color='primary' onClick={() => setOpen(false)}>Powrót</Button>
                <Button variant='contained' color='primary'>{actionText}</Button>
            </DialogActions>
        </MuiDialog>
    );
};

export default Dialog;
