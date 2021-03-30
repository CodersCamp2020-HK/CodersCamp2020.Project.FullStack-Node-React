import {
    Button,
    Container,
    Dialog as MuiDialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    TextField,
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
            justifyContent: 'space-between',
            padding: 0,
            margin: 0,
        },
        divider: {
            marginTop: theme.spacing(2),
        },
        content: {
            paddingTop: 0,
            paddingLeft: theme.spacing(2),
        },
        column: {
            display: 'flex',
            flexDirection: 'column',
            padding: theme.spacing(2),
        },
        title: {
            padding: theme.spacing(2),
        },
    });

    const classes = useStyles();
    return (
        <MuiDialog classes={{ paper: classes.paper }} open={open} maxWidth="sm">
            <DialogTitle className={classes.title}>
                {title}
                <Divider className={classes.divider} />
            </DialogTitle>
            <DialogContent className={classes.content}>{content}</DialogContent>
            <DialogActions className={classes.column}>
                <TextField
                    multiline
                    variant="outlined"
                    fullWidth
                    size="medium"
                    rows={5}
                    rowsMax={5}
                    required
                    error={true}
                    name="message"
                    placeholder="Wpisz wiadomość"
                />
                <Container classes={{ root: classes.buttons }}>
                    <Button fullWidth variant="outlined" color="primary" onClick={() => setOpen(false)}>
                        Powrót
                    </Button>
                    <Button fullWidth variant="contained" color="primary">
                        {actionText}
                    </Button>
                </Container>
            </DialogActions>
        </MuiDialog>
    );
};

export default Dialog;
