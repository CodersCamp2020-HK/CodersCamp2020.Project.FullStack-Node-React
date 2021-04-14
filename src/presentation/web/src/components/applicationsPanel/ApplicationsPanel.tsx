import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Paper from '@material-ui/core/Paper';
import { FormAnimalAnswer, useGetAnimalSubmission } from '../../client';
import { useHistory } from 'react-router-dom';
import LoadingCircle from '../loadingCircle/LoadingCircle';
import SurveyForm from '../forms/surveyForm/SurveyForm';

const useStyles = makeStyles((theme) => ({
    paper: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        padding: '2rem 4rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    root: {
        color: '#FFF',
        backgroundColor: theme.palette.secondary.main,
        "&:hover": {
            backgroundColor: theme.palette.secondary.main
        },
    },
    disabled: {}
}))

const mapAnswersToQuestions = (answers: FormAnimalAnswer[]) => {
    const answeredQuestion: Record<string, string | string[]> = {};
    answers.forEach((answer) => answeredQuestion[`question${answer.question.id}`] = answer.answer.answer)

    return answeredQuestion
}

const ApplicationsPanel = () => {
    const requestOptions = { headers: { access_token: localStorage.getItem('apiKey') ?? '' } };
    const { location } = useHistory();

    const classes = useStyles();
    const [selectedBtn, setSelectedBtn] = useState(1);

    const submissionId = parseInt(location.pathname.split('/').slice(-1).join(''));
    const { 
        data: submissionData,
        loading: loadingSubmissions
    } = useGetAnimalSubmission({ id: 1, requestOptions });

    return (
        <Paper className={classes.paper} square={false}>
            <ButtonGroup fullWidth color="secondary">
                <Button className={selectedBtn === 1 ? classes.root : ''} onClick={() => {
                    setSelectedBtn(1);
                }}>
                    Wniosek
                </Button>
                <Button className={selectedBtn === 2 ? classes.root : ''} onClick={() => setSelectedBtn(2)}>
                    O zwierzęciu
                </Button>
                <Button className={selectedBtn === 3 ? classes.root : ''} onClick={() => setSelectedBtn(3)}>
                    O adoptującym
                </Button>
            </ButtonGroup>
            {loadingSubmissions && <LoadingCircle />}
            {submissionData && selectedBtn === 1 &&
                <SurveyForm
                    questions={submissionData.answers.map((answer) => answer.question)}
                    defaultValues={mapAnswersToQuestions(submissionData.answers)}
                    handleSubmit={() => {}}
                    disabled={true}
                />
            }
        </Paper>
    )
}

export default ApplicationsPanel