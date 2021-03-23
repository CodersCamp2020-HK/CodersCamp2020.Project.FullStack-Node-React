import {
    Card,
    CardMedia,
    Container,
    IconButton,
    makeStyles,
    Step,
    StepButton,
    StepLabel,
    Stepper,
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
            //backgroundColor: theme.palette.secondary.main,
            // width: 50,
            // height: 50,
            // borderRadius: '50%',
        },
        dotActive: {
            backgroundColor: theme.palette.secondary.main,
        },
    });
    const classes = useStyle();
    return (
        <Container>
            <Container className={classes.slideContainer}>
                <IconButton className={classes.buttonBackground} onClick={() => setSlideIndex(slideIndex - 1)}>
                    <ArrowBack />
                </IconButton>
                <SwipeableViews index={slideIndex} enableMouseEvents={true}>
                    <Card>
                        <CardMedia
                            className={classes.image}
                            component="img"
                            image="https://images.pexels.com/photos/2817421/pexels-photo-2817421.jpeg"
                        />
                    </Card>
                    <Card>
                        <CardMedia
                            className={classes.image}
                            component="img"
                            image="https://images.pexels.com/photos/416160/pexels-photo-416160.jpeg"
                        />
                    </Card>
                </SwipeableViews>
                <IconButton className={classes.buttonBackground} onClick={() => setSlideIndex(slideIndex + 1)}>
                    <ArrowForward />
                </IconButton>
            </Container>
            <Container style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <GoPrimitiveDot />
                <GoPrimitiveDot />
            </Container>
        </Container>
    );
};

export default Slider;
