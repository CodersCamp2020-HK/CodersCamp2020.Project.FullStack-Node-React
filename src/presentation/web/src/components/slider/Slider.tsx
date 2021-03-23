import {
    Card,
    CardMedia,
    Container,
    IconButton,
    makeStyles,
    Theme,
    useTheme,
} from '@material-ui/core';
import { ArrowBack, ArrowForward } from '@material-ui/icons';
import React, { useState } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { GoPrimitiveDot } from 'react-icons/go';

interface SliderProps {
    photos: string[];
}

const Slider = ({ photos }: SliderProps) => {
    const [slideIndex, setSlideIndex] = useState<number>(0);
    const [isLastIndex, setIsLastIndex] = useState<boolean>(false);
    const MAX_SLIDE_INDEX = photos.length;

    const theme = useTheme<Theme>();
    const useStyle = makeStyles({
        buttonBackground: {
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.secondary.contrastText,
            '&:hover': {
                backgroundColor: theme.palette.secondary.light,
            },
        },
        slideContainer: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
        },
        image: {
            width: '100%',
            height: '100%',
        },
        dot: {
            color: theme.palette.action.disabled,
            fontSize: 24,
            '&:hover': {
                cursor: 'pointer',
                fontSize: 30,
            },
        },
        dotActive: {
            color: theme.palette.secondary.main,
            fontSize: 30,
        },
    });
    const classes = useStyle();
    return (
        <Container>
            <Container className={classes.slideContainer}>
                <IconButton className={classes.buttonBackground} onClick={() => setSlideIndex(slideIndex - 1)}>
                    <ArrowBack />
                </IconButton>
                <SwipeableViews index={slideIndex} enableMouseEvents={true} onChangeIndex={(index) => setSlideIndex(index)}>
                    {photos.map((photo, index) => 
                         <Card>
                            <CardMedia
                                className={classes.image}
                                component="img"
                                image={photo}
                            />
                        </Card>
                    )}
                </SwipeableViews>
                <IconButton className={classes.buttonBackground} onClick={() => setSlideIndex(slideIndex + 1)}>
                    <ArrowForward />
                </IconButton>
            </Container>
            <Container style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                {photos.map((photo, index) => <GoPrimitiveDot className={index == slideIndex ? classes.dotActive : classes.dot} onClick={() => setSlideIndex(index)} />)}
            </Container>
        </Container>
    );
};

export default Slider;
