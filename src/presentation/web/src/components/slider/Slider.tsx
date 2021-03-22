import { Card, CardMedia, Container, IconButton, makeStyles, Theme, useTheme } from '@material-ui/core';
import { ArrowBack, ArrowForward } from '@material-ui/icons';
import React from 'react';

interface SliderProps {
    photos: string[];
}

const Slider = ({ photos }: SliderProps) => {
    const theme = useTheme<Theme>();
    const useStyle = makeStyles({
        buttonBackground: {
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.secondary.contrastText,
            '&:hover': {
                backgroundColor: theme.palette.secondary.light,
            },
        },
        card: {
            maxWidth: '50%',
        },
        image: {
            width: '100%',
            height: '100%',
        },
    });
    const classes = useStyle();
    return (
        <Container>
            <Card className={classes.card}>
                <CardMedia
                    className={classes.image}
                    component="img"
                    image="https://images.pexels.com/photos/2817421/pexels-photo-2817421.jpeg"
                />
            </Card>
            <IconButton className={classes.buttonBackground}>
                <ArrowBack />
            </IconButton>
            <IconButton className={classes.buttonBackground}>
                <ArrowForward />
            </IconButton>
        </Container>
    );
};

export default Slider;
