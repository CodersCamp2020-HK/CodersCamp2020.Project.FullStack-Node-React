import React from 'react';
import { AnimalAnswer, PostAnimalSubmissionParams, useGetAllAdoptionSteps, useGetForm, usePostAnimalSubmission } from '../../client';
import useQuery from '../../utils/UseQuery';
import { useHistory } from "react-router-dom";
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import AdoptionApplicationFirstStep, { Inputs } from '../adoptionApplicationFirstStep/AdoptionApplicationFirstStep';
import SurveyForm from '../forms/surveyForm/SurveyForm';
import { Theme, makeStyles } from '@material-ui/core/styles';
import AdoptionStepper from '../common/stepper/AdoptionStepper';

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
}

const useStyles = makeStyles((theme: Theme) => ({
    mainPaper: {
        variant: "outlined",
        backgroundColor: theme.palette.background.paper,
        padding: '20px 50px',
        [theme.breakpoints.down('sm')]: {
            padding: 20
        }
    },
    typography: {
        marginBottom: '2rem'
    }
}));

const FirstStep = () => {
    const history = useHistory();
    const id = useQuery().get('id');
    const classes = useStyles();

    const animalId = id ? parseInt(id) : 1;
    const requestOptions = { headers: { access_token: localStorage.getItem('apiKey') ?? '' } };

    const { data, refetch } = useGetForm({ animalId, lazy: !id, requestOptions });
    const { data: adoptionStepsData, refetch: adoptionStepsRefetch } = useGetAllAdoptionSteps({ animalId, lazy: !id, requestOptions })
    const { mutate: postSubmission } = usePostAnimalSubmission({
        requestOptions,
    });
    console.log(adoptionStepsData);
    const handleIdSubmit = async ({ numerEwidencyjny: id }: Inputs) => {
        try {
            refetch({ pathParams: { animalId: id } });
            adoptionStepsRefetch({ pathParams: { animalId: id } });
            history.push(`?id=${id}`);
        } catch (error) {
            console.error(error)
        }
    }
    const handleFormSubmit = async (formData: any) => {
        try {
            if (data) {
                const answers: PostAnimalSubmissionParams = pushAnswersToArray(formData, animalId, data.number);
                await postSubmission(answers);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Paper className={classes.mainPaper} variant="outlined">
            <AdoptionApplicationFirstStep description={data?.description} title={data?.name} handleSubmit={handleIdSubmit}>
                {data && data.form && adoptionStepsData &&
                    <>
                        <AdoptionStepper adoptionSteps={adoptionStepsData.map((step) => step.name)} currentStep={1} />
                        <Typography variant="h6">WAŻNE!</Typography>
                        <Typography className={classes.typography}>
                            Wypełnienie ankiety nie jest jednoznaczne z tym, że zwierzę zostanie Państwu wyadoptowane.
                            Na decyzję o wydaniu zwierzaka do adopcji składa się wiele czynników m.in. ankieta. Szukamy dla 
                            zwierząt dobrych domów biorąc pod uwagę ich usposobienie, charakter,wielkość. W przypadku wyrażenia 
                            zgody na adopcję niniejsza ankieta będzie integralną częścią zobowiązania adopcyjnego/umowy.
                            <br />Prosimy tym samym o przemyślane i zgodne z prawdą odpowiedzi na pytania.
                        </Typography>
                        <SurveyForm formData={data.form} handleSubmit={handleFormSubmit} />
                    </>
                }
            </AdoptionApplicationFirstStep>
                </Paper>
    )
}

export default FirstStep
