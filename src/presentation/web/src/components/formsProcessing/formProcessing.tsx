import React, { useContext, useEffect } from "react";
import { useState } from "react";
import {
    Paper,
    Divider,
    Theme,
    Typography,
    Button,
    Card,
    CardActionArea,
    CardMedia
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useGetAllAdoptionSteps, useGetAnimal, useGetAnimalSubmission } from "../../client";
import { AppCtx } from "../../App";
import LoadingCircle from "../loadingCircle/LoadingCircle";
import SurveyForm from "../forms/surveyForm/SurveyForm";
import mapAnswersToQuestions from "../../utils/MapAnswersToQuestions";
import formatDate from "../../utils/formatText/formatDate";
import AdoptionStepper from "../common/stepper/AdoptionStepper";
import { useHistory } from "react-router-dom";

interface PhotoProps {
    animalId: number;
}

const useStyle = makeStyles((theme: Theme) => ({
    paper: {
        width: '100%',
        padding: '2rem 2rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    divider: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        width: "100%",
    },
    buttonsWrapper: {
        width: "300px",
        margin: "auto",
        "& > *": {
            marginTop: theme.spacing(2),
        },
    },
    root: {
        maxWidth: 345,
    },
    media: {
        width: 300,
        height: 200
    }
}));

const Photo: React.FC<PhotoProps> = ({ animalId }) => {
    const classes = useStyle();
    const { data: animalData, loading: animalLoading } = useGetAnimal({ animalId });

    return <>{
        !animalLoading && animalData 
        ?
            <Card className={classes.root}>
                <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        image={`data:image/png;base64,${Buffer.from(animalData.thumbnail.buffer, 'binary').toString('base64')}`}
                    />
                </CardActionArea>
            </Card>
        :
            <LoadingCircle />
        }
    </>   
}

const StepperWrapper: React.FC<PhotoProps> = ({ animalId }) => {
    const requestOptions = { headers: { access_token: localStorage.getItem('apiKey') ?? '' } };

    const { location } = useHistory();
    const { data: adoptionStepsData, loading: adoptionStepsLoading } = useGetAllAdoptionSteps({ animalId, requestOptions });

    const currentStep = parseInt(location.pathname.split('/').slice(-1).join(''));
    return <>{
        !adoptionStepsLoading && adoptionStepsData 
        ?
            <>
                <Typography variant="h4">
                    {adoptionStepsData[currentStep - 1].name}
                </Typography>
                <AdoptionStepper adoptionSteps={adoptionStepsData.map((step) => step.name)} currentStep={currentStep} />
                <Typography variant="body1">
                    {adoptionStepsData[currentStep - 1].description}
                </Typography>
            </>
        :
            <LoadingCircle />
        }
    </>  
}

const FormProcessing = () => {
    const requestOptions = { headers: { access_token: localStorage.getItem('apiKey') ?? '' } };
    const handleButton = () => setShowApplication(!showApplication);

    const { appState } = useContext(AppCtx);
    const classes = useStyle();
    const [showApplication, setShowApplication] = useState(false);
    const { data: submissionData, loading: submissionLoading } = useGetAnimalSubmission({ userId: appState.userId!, requestOptions });

    return (
        <Paper className={classes.paper}>
            {!submissionLoading && submissionData 
                ? 
                    <>  
                        <StepperWrapper animalId={submissionData.animal.id} />
                        <Divider className={classes.divider} />
                        <Typography variant="body1">
                            Data wysłania wniosku: {formatDate(submissionData.submissionDate)}
                        </Typography>
                        <Divider className={classes.divider} />
                        <Typography variant="body1">
                            {submissionData.animal.name}
                        </Typography>
                        <Photo animalId={submissionData.animal.id} />
                        <div className={classes.buttonsWrapper}>
                            <Button
                            variant="outlined"
                            color="primary"
                            size="medium"
                            fullWidth={true}
                            onClick={handleButton}
                            >
                            {showApplication ? "Zwiń wysłany wniosek" : "Rozwiń wysłany wnisoek"}
                            </Button>
                        </div>
                        <Divider className={classes.divider} />
                        {showApplication && 
                            <SurveyForm
                                questions={submissionData.answers.map((answer) => answer.question)}
                                defaultValues={mapAnswersToQuestions(submissionData.answers)}
                                handleSubmit={() => {}}
                                disabled={true}
                            />
                        }
                    </>
                :
                    <LoadingCircle />
            }
        </Paper>
    );
};

export default FormProcessing;