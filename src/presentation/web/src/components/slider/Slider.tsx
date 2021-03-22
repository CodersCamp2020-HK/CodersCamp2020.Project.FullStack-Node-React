import React from 'react';
import { Slide, Card, CardMedia, IconButton, makeStyles, useTheme, Theme } from '@material-ui/core';
import { ArrowBack, ArrowForward } from '@material-ui/icons';

interface SliderProps {
    photos: string[]
}

const Slider = ({photos}: SliderProps) => {
    const theme = useTheme<Theme>()
    const useStyle = makeStyles({
        buttonBackground: {
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.secondary.contrastText,
            '&:hover': {
                backgroundColor: theme.palette.secondary.light,
        }
    }
    })
    const classes = useStyle();
    return (
        <Card>
            <IconButton className={classes.buttonBackground}>
                <ArrowBack />
            </IconButton>
            <IconButton className={classes.buttonBackground}>
                <ArrowForward />
            </IconButton>
        </Card>
    )
}

export default Slider;