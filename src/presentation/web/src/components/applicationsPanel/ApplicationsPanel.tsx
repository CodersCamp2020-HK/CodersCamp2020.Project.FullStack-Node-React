import React, { useState } from 'react'
import { Animal, AnimalFormStatus, FormAnimalAnswer, useChangeFormStatusForAdoption, useGetAnimalSubmission } from '../../client';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import LoadingCircle from '../loadingCircle/LoadingCircle';
import SurveyForm from '../forms/surveyForm/SurveyForm';
import mapAnswersToQuestions from '../../utils/MapAnswersToQuestions';
import LoadingCircleSmall from '../loadingCircleSmall/LoadingCircleSmall';
import formatDate from '../../utils/formatText/formatDate';

interface SingleApplicationProps {
    answers: FormAnimalAnswer[];
    submissionId: number;
}

interface AnimalInfoProps {
    animal: Animal;
}

const useStyles = makeStyles((theme) => ({
    paper: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        padding: '3rem 3rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    buttonGroup: {
        marginBottom: '2rem'
    },
    selected: {
        color: '#FFF',
        backgroundColor: theme.palette.secondary.main,
        "&:hover": {
            backgroundColor: theme.palette.secondary.main
        },
    },
    buttonWrapper: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    button: {
        width: '20rem',
    }
}))

const SingleApplication: React.FC<SingleApplicationProps> = ({ answers, submissionId }) => {
    const requestOptions = { headers: { access_token: localStorage.getItem('apiKey') ?? '' } };

    const classes = useStyles();
    const { mutate: changeStatus, loading } = useChangeFormStatusForAdoption({ requestOptions });

    const onClick = async (status: AnimalFormStatus): Promise<void> => {
        changeStatus({ status, submissionId});
    }

    return (
        <>
            <SurveyForm
                questions={answers.map((answer) => answer.question)}
                defaultValues={mapAnswersToQuestions(answers)}
                handleSubmit={() => {}}
                disabled={true}
            />
            <div className={classes.buttonWrapper}>
                <Button
                    className={classes.button}
                    color="primary"
                    size="large"
                    variant="outlined"
                    onClick={() => onClick('rejected')}>
                        Odrzuć wniosek {loading && <LoadingCircleSmall />}
                </Button>
                <Button
                    className={classes.button}
                    color="primary"
                    size="large"
                    variant="contained"
                    onClick={() => onClick('accepted')}>
                        Akceptuj wniosek {loading && <LoadingCircleSmall />}
                </Button>
            </div>
        </>
    )
}

const AnimalInfo: React.FC<AnimalInfoProps> = ({ animal }) => {
    const plLabels = new Map([
        ['name', 'Imię'],
        ['age', 'Wiek'],
        ['readyForAdoption', 'Gotowy do adopcji'],
        ['specie', 'Gatunek'],
        ['activeLevel', 'Aktywność'],
        ['size', 'Rozmiar'],
        ['specialDiet', 'Specjalna dieta'],
        ['admissionToShelter', 'Data przyjęcia w schronisku'],
        ['description', 'Opis'],
        ['acceptsKids', 'Akceptuje dzieci'],
        ['acceptsOtherAnimals', 'Akceptuje inne zwierzęta'],
        ['false', 'Nie'],
        ['true', 'Tak'],
        ['dog', 'Pies'],
        ['cat', 'Kot'],
        ['low', 'Niska'],
        ['medium', 'Średnia'],
        ['high', 'Wysoka'],
        ['small', 'Mały'],
        ['medium', 'Średniu'],
        ['large', 'Duży'],
    ])
    const { additionalInfo: _, description, admissionToShelter, ...allAnimalProps }  = { ...animal, ...animal.additionalInfo, ...animal.specie };
    const keys = Object.keys(allAnimalProps);
    const values = Object.values(allAnimalProps);
    return <> {keys.map((key, index) => {
        return (<TextField
                    key={key}
                    disabled={true}
                    label={plLabels.get(key) ?? key}
                    defaultValue={plLabels.get(values[index].toString()) ?? values[index]} 
                />);
        })} 
        <TextField key={admissionToShelter} disabled={true} label={'Data przyjęcia w schronisku'} defaultValue={formatDate(admissionToShelter)} />
        <TextField key={description} disabled={true} label={'Opis'} defaultValue={description} />
    </>
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
    } = useGetAnimalSubmission({ userId: 2, requestOptions });
    console.log(submissionData);

    return (
        <Paper className={classes.paper} square={false}>
            <ButtonGroup className={classes.buttonGroup} fullWidth color="secondary">
                <Button className={selectedBtn === 1 ? classes.selected : ''} onClick={() => {
                    setSelectedBtn(1);
                }}>
                    Wniosek
                </Button>
                <Button className={selectedBtn === 2 ? classes.selected : ''} onClick={() => setSelectedBtn(2)}>
                    O zwierzęciu
                </Button>
                <Button className={selectedBtn === 3 ? classes.selected : ''} onClick={() => setSelectedBtn(3)}>
                    O adoptującym
                </Button>
            </ButtonGroup>
            {submissionData && selectedBtn === 1 && <SingleApplication answers={submissionData.answers} submissionId={1} />}
            {submissionData && selectedBtn === 2 && <AnimalInfo animal={submissionData.animal} />}
            {loadingSubmissions && <LoadingCircle />}
            
        </Paper>
    )
}

export default ApplicationsPanel