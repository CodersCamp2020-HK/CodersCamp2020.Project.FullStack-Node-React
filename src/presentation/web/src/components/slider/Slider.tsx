import { Card, CardMedia, Container, IconButton, makeStyles, MobileStepper, Theme, useTheme } from '@material-ui/core';
import { ArrowBack, ArrowForward } from '@material-ui/icons';
import React, { useState } from 'react';
import SwipeableViews from 'react-swipeable-views';

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
        image: {
            width: '100%',
            height: '100%',
        },
        dotActive: {
            backgroundColor: theme.palette.secondary.main,
        },
    });
    const classes = useStyle();
    return (
        <Container>
            <SwipeableViews index={slideIndex}>
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
            <IconButton className={classes.buttonBackground} onClick={() => setSlideIndex(slideIndex - 1)}>
                <ArrowBack />
            </IconButton>
            <IconButton className={classes.buttonBackground} onClick={() => setSlideIndex(slideIndex + 1)}>
                <ArrowForward />
            </IconButton>
            <MobileStepper
                classes={{
                    dotActive: classes.dotActive,
                }}
                variant="dots"
                steps={6}
                position="static"
                activeStep={1}
                backButton={<IconButton />}
                nextButton={<IconButton />}
            />
        </Container>
    );
};

export default Slider;
