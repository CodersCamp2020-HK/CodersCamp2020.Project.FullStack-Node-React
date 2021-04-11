import { Card, CardMedia, Container, IconButton, makeStyles, Theme, useTheme } from '@material-ui/core';
import { ArrowBack, ArrowForward } from '@material-ui/icons';
import React, { useState } from 'react';
import { GoPrimitiveDot } from 'react-icons/go';
import SwipeableViews from 'react-swipeable-views';

interface SliderProps {
    photos: string[];
}

const Slider = ({ photos }: SliderProps) => {
    const [slideIndex, setSlideIndex] = useState<number>(0);
    const MAX_SLIDE_INDEX = photos.length - 1;

    const handleNext = () => {
        if (slideIndex !== MAX_SLIDE_INDEX) setSlideIndex(slideIndex + 1);
    };

    const handleBack = () => {
        if (slideIndex !== 0) setSlideIndex(slideIndex - 1);
    };

    const theme = useTheme<Theme>();
    const useStyle = makeStyles({
        arrowButton: {
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.secondary.contrastText,
            '&:hover': {
                backgroundColor: theme.palette.secondary.light,
            },
        },
        prevButton: {
            marginRight: theme.spacing(3),
        },
        nextButton: {
            marginLeft: theme.spacing(3),
        },
        carouselContainer: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: theme.spacing(2),
        },
        image: {
            width: '100%',
            height: '100%',
            '&:hover': {
                cursor: 'grab',
            },
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
            <Container className={classes.carouselContainer}>
                <IconButton className={`${classes.arrowButton} ${classes.prevButton}`} onClick={handleBack}>
                    <ArrowBack />
                </IconButton>
                <SwipeableViews
                    index={slideIndex}
                    enableMouseEvents={true}
                    onChangeIndex={(index) => setSlideIndex(index)}
                >
                    {photos.map((photo, index) => (
                        <Card>
                            <CardMedia className={classes.image} component="img" image={`data:image/png;base64, ${photo}`} />
                        </Card>
                    ))}
                </SwipeableViews>
                <IconButton className={`${classes.arrowButton} ${classes.nextButton}`} onClick={handleNext}>
                    <ArrowForward />
                </IconButton>
            </Container>
            <Container style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {photos.map((photo, index) => (
                    <GoPrimitiveDot
                        className={index == slideIndex ? classes.dotActive : classes.dot}
                        onClick={() => setSlideIndex(index)}
                    />
                ))}
            </Container>
        </Container>
    );
};

export default Slider;
