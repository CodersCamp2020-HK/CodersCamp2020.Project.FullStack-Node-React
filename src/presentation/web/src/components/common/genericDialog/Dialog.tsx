import {
    Button,
    Container,
    Dialog as MuiDialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    TextField,
    useTheme,
} from '@material-ui/core';
import { Theme } from '@material-ui/core/styles';
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

const useStyles = makeStyles((theme: Theme) => ({
    paper: {
        padding: theme.spacing(2),
    },
    buttonsContainer: {
        display: 'flex',
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
    closeButton: {
        marginRight: theme.spacing(2),
    }
}));

const Dialog = ({ isOpen, title, content, actionText, textarea, handleAction }: DialogProps) => {
    const [open, setOpen] = useState<boolean>(isOpen);
    const { register, handleSubmit, errors } = useForm<{ message: string }>();
    const theme = useTheme<Theme>();
    const classes = useStyles();

    const onSubmit = (data: { message: string }) => {
        handleAction(data.message);
    };
    return (
        <MuiDialog data-testid="dialog" classes={{ paper: classes.paper }} open={open} maxWidth="sm">
            <DialogTitle data-testid="title" className={classes.title}>
                {title}
                <Divider className={classes.divider} />
            </DialogTitle>
            <DialogContent data-testid="content" className={classes.content}>
                {content}
            </DialogContent>
            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogActions className={classes.column}>
                    {textarea && (
                        <TextField
                            inputProps={{'data-testid': 'textarea'}}
                            multiline
                            variant="outlined"
                            fullWidth
                            size="medium"
                            rows={5}
                            rowsMax={5}
                            error={errors.hasOwnProperty('message')}
                            name="message"
                            placeholder="Wpisz wiadomość"
                            inputRef={register({ required: 'Pole jest wymagane' })}
                        />
                    )}
                    {errors.message && errors.message.message}
                    <Container classes={{ root: classes.buttonsContainer }}>
                        <Button
                            data-testid="return"
                            className={classes.closeButton}
                            fullWidth
                            variant="outlined"
                            color="primary"
                            onClick={() => setOpen(false)}
                        >
                            Powrót
                        </Button>
                        <Button data-testid="action" type="submit" fullWidth variant="contained" color="primary">
                            {actionText}
                        </Button>
                    </Container>
                </DialogActions>
            </form>
        </MuiDialog>
    );
};

export default Dialog;
