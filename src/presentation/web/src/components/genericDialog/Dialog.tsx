import React from 'react';
import { Dialog as MuiDialog } from '@material-ui/core';
import { DialogTitle } from '@material-ui/core';
import { DialogContent } from '@material-ui/core';
import { DialogActions } from '@material-ui/core';
const Dialog = (open: boolean) => {
    return (
        <MuiDialog open={open}>
            <DialogTitle>

            </DialogTitle>
            <DialogContent>

            </DialogContent>
            <DialogActions>
                <button>asd</button>
                <button>zxc</button>
            </DialogActions>
        </MuiDialog>
    )
}

export default Dialog;