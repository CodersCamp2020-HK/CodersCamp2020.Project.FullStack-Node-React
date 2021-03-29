import React from 'react';
import { Dialog as MuiDialog } from '@material-ui/core';
import { DialogTitle } from '@material-ui/core';
import { DialogContent } from '@material-ui/core';
import { DialogActions } from '@material-ui/core';

interface DialogProps {
    isOpen: boolean;
    title: string;
    content: string;
}

const Dialog = ({isOpen, title, content}: DialogProps) => {
    return (
        <MuiDialog open={isOpen}>
            <DialogTitle>
                {title}
            </DialogTitle>
            <DialogContent>
                {content}
            </DialogContent>
            <DialogActions>
                <button>asd</button>
                <button>zxc</button>
            </DialogActions>
        </MuiDialog>
    )
}

export default Dialog;