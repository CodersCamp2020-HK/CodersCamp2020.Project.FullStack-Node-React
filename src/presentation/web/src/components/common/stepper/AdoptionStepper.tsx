import React, { useEffect } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import { StepLabel } from '@material-ui/core';


interface Props{
    adoptionSteps: Array<string>,
    currentStep: number,
}

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
      width: '100%',
      boxSizing: 'border-box'
    },
    button: {
        marginRight: theme.spacing(1),
    },
    backButton: {
        marginRight: theme.spacing(1),
    },
    completed: {
        display: 'inline-block',
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
}));

const AdoptionStepper: React.FC<Props> = ({ adoptionSteps, currentStep }) => {
    const classes = useStyles();
    const steps = adoptionSteps;
    const activeStep = currentStep - 1;

    return (
        <Stepper className={classes.root} activeStep={activeStep} alternativeLabel>
            {steps.map((t, index) => (
                <Step key={index}>
                    <StepLabel>{t}</StepLabel>
                </Step>
        ))}
        </Stepper>
    );
}

export default AdoptionStepper;


