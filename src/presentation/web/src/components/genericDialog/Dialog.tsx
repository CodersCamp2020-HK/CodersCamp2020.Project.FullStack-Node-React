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
import { useForm } from 'react-hook-form';

interface DialogProps {
    isOpen: boolean;
    title: string;
    content: string;
    textarea?: boolean;
    actionText: string;
    handleAction: (text?: string) => any;
}

const Dialog = ({ isOpen, title, content, actionText, textarea, handleAction }: DialogProps) => {
    const [open, setOpen] = useState<boolean>(isOpen);
    const { register, handleSubmit } = useForm();
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

    const onSubmit = (data: any) => {
        console.log(data);
        handleAction();
    };
    return (
        <MuiDialog classes={{ paper: classes.paper }} open={open} maxWidth="sm">
            <DialogTitle className={classes.title}>
                {title}
                <Divider className={classes.divider} />
            </DialogTitle>
            <DialogContent className={classes.content}>{content}</DialogContent>
            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogActions className={classes.column}>
                    {textarea && (
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
                            inputRef={register}
                        />
                    )}
                    <Container classes={{ root: classes.buttons }}>
                        <Button
                            style={{ marginRight: theme.spacing(2) }}
                            fullWidth
                            variant="outlined"
                            color="primary"
                            onClick={() => setOpen(false)}
                        >
                            Powrót
                        </Button>
                        <Button type="submit" fullWidth variant="contained" color="primary">
                            {actionText}
                        </Button>
                    </Container>
                </DialogActions>
            </form>
        </MuiDialog>
    );
};

export default Dialog;
