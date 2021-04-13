import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AppCtx } from '../../App';
import {
    AnimalAnswer,
    PostAnimalSubmissionParams,
    useGetAllAdoptionSteps,
    useGetForm,
    usePostAnimalSubmission,
} from '../../client';
import useQuery from '../../utils/UseQuery';
import AdoptionApplicationFirstStep, { Inputs } from '../adoptionApplicationFirstStep/AdoptionApplicationFirstStep';
import AdoptionStepper from '../common/stepper/AdoptionStepper';
import SurveyForm from '../forms/surveyForm/SurveyForm';
import SideNav from '../navbar/sideNav/SideNav';

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
    const { appState } = useContext(AppCtx);
    const history = useHistory();
    const id = useQuery().get('id');
    const classes = useStyles();

    const { role, userName } = appState;
    const animalId = id ? parseInt(id) : 1;

    const { data, refetch } = useGetForm({
        animalId,
        lazy: !id,
        requestOptions: { headers: { access_token: localStorage.getItem('apiKey') ?? '' } },
    });
    const { data: adoptionStepsData, refetch: adoptionStepsRefetch } = useGetAllAdoptionSteps({
        lazy: !id,
        requestOptions: { headers: { access_token: localStorage.getItem('apiKey') ?? '' } },
    });
    const { mutate: postSubmission } = usePostAnimalSubmission({
        requestOptions: { headers: { access_token: localStorage.getItem('apiKey') ?? '' } },
    });
    console.log(adoptionStepsData);

    const handleIdSubmit = async ({ numerEwidencyjny: id }: Inputs) => {
        try {
            refetch({ pathParams: { animalId: id } });
            adoptionStepsRefetch({ pathParams: { animalId: id } });
            history.push(`?id=${id}`);
        } catch (error) {
            console.error(error);
        }
    };
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
        <>
            <Grid item xs={12} sm={4} md={3}>
                <SideNav role={role!} name={userName!} />
            </Grid>
            <Grid item sm>
                <Paper className={classes.mainPaper} variant="outlined">
                    <AdoptionApplicationFirstStep
                        description={data?.description}
                        title={data?.name}
                        handleSubmit={handleIdSubmit}
                    >
                        {data && data.form && adoptionStepsData && (
                            <>
                                <AdoptionStepper
                                    adoptionSteps={adoptionStepsData.map((step) => step.name)}
                                    currentStep={1}
                                />
                                <Typography variant="h6">WAŻNE!</Typography>
                                <Typography className={classes.typography}>
                                    Wypełnienie ankiety nie jest jednoznaczne z tym, że zwierzę zostanie Państwu
                                    wyadoptowane. Na decyzję o wydaniu zwierzaka do adopcji składa się wiele czynników
                                    m.in. ankieta. Szukamy dla zwierząt dobrych domów biorąc pod uwagę ich usposobienie,
                                    charakter,wielkość. W przypadku wyrażenia zgody na adopcję niniejsza ankieta będzie
                                    integralną częścią zobowiązania adopcyjnego/umowy.
                                    <br />
                                    Prosimy tym samym o przemyślane i zgodne z prawdą odpowiedzi na pytania.
                                </Typography>
                                <SurveyForm formData={data.form} handleSubmit={handleFormSubmit} />
                            </>
                        )}
                    </AdoptionApplicationFirstStep>
                </Paper>
            </Grid>
        </>
    );
};

export default FirstStep;
