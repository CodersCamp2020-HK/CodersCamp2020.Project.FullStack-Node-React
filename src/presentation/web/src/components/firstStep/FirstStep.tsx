import React, { useState } from 'react';
import { AnimalAnswer, PostAnimalSubmissionParams, useGetAllAdoptionSteps, useGetForm, usePostAnimalSubmission } from '../../client';
import useQuery from '../../utils/UseQuery';
import { Redirect, useHistory } from "react-router-dom";
import Paper from '@material-ui/core/Paper';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AdoptionApplicationFirstStep, { Inputs } from '../adoptionApplicationFirstStep/AdoptionApplicationFirstStep';
import SurveyForm from '../forms/surveyForm/SurveyForm';
import AdoptionStepper from '../common/stepper/AdoptionStepper';
import LoadingCircle from '../loadingCircle/LoadingCircle';

const pushAnswersToArray = (data: any, animalId: number, stepNumber: number) => {
    const answers: PostAnimalSubmissionParams = {
        animalId,
        stepNumber,
        answers: [],
    };
    for (const question in data) {
        const answer: AnimalAnswer = {
            questionId: parseInt(question.replace('question', '')),
            answer: {
                type: data[question].type,
                answer: data[question].answer,
            },
        };
        answers.answers.push(answer);
    }
    return answers;
};

const useStyles = makeStyles((theme: Theme) => ({
    mainPaper: {
        width: '100%',
        variant: 'outlined',
        backgroundColor: theme.palette.background.paper,
        padding: '20px 50px',
        [theme.breakpoints.down('sm')]: {
            padding: 20,
        },
    },
    typography: {
        marginBottom: '2rem',
    },
}));

const FirstStep = () => {
    const history = useHistory();
    const id = useQuery().get('id');
    const classes = useStyles();

    const animalId = id ? parseInt(id) : 1;
    const requestOptions = { headers: { access_token: localStorage.getItem('apiKey') ?? '' } };

    const { data: getFormData, refetch: getForm, loading: getFormLoading } = useGetForm({
        animalId,
        lazy: !id,
        requestOptions,
    });
    const { data: adoptionStepsData, refetch: adoptionStepsRefetch, loading: adoptionStepsLoading } = useGetAllAdoptionSteps({
        animalId,
        lazy: !id,
        requestOptions,
    });
    const { mutate: postSubmission } = usePostAnimalSubmission({
        requestOptions,
    });
    const [fireRedirect, setFireRedirect] = useState<boolean>(false);

    const currentStep = parseInt(history.location.pathname.split('/').slice(-1).join(''));

    const handleIdSubmit = async ({ numerEwidencyjny: id }: Inputs) => {
        try {
            getForm({ pathParams: { animalId: id } });
            adoptionStepsRefetch({ pathParams: { animalId: id } });
            history.push(`?id=${id}`);
        } catch (error) {
            console.error(error);
        }
    };
    const handleFormSubmit = async (formData: any) => {
        try {
            if (getFormData) {
                const answers: PostAnimalSubmissionParams = pushAnswersToArray(formData, animalId, getFormData.number);
                await postSubmission(answers);
                setFireRedirect(true);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Paper className={classes.mainPaper} variant="outlined">
            <AdoptionApplicationFirstStep description={getFormData?.description} title={getFormData?.name} handleSubmit={handleIdSubmit}>
                {getFormData && getFormData.form && adoptionStepsData &&
                    <>
                        <AdoptionStepper adoptionSteps={adoptionStepsData.map((step) => step.name)} currentStep={currentStep} />
                        <Typography variant="h6">WAŻNE!</Typography>
                        <Typography className={classes.typography}>
                            Wypełnienie ankiety nie jest jednoznaczne z tym, że zwierzę zostanie Państwu wyadoptowane.
                            Na decyzję o wydaniu zwierzaka do adopcji składa się wiele czynników m.in. ankieta. Szukamy dla 
                            zwierząt dobrych domów biorąc pod uwagę ich usposobienie, charakter,wielkość. W przypadku wyrażenia 
                            zgody na adopcję niniejsza ankieta będzie integralną częścią zobowiązania adopcyjnego/umowy.
                            <br />Prosimy tym samym o przemyślane i zgodne z prawdą odpowiedzi na pytania.
                        </Typography>
                        <SurveyForm questions={getFormData.form.questions} handleSubmit={handleFormSubmit} />
                    </>
                }
                {getFormLoading || adoptionStepsLoading &&
                    <LoadingCircle />
                }
            </AdoptionApplicationFirstStep>
            {fireRedirect && <Redirect to={'/account/adoption/step'} />}
        </Paper>
    )
}

export default FirstStep;
