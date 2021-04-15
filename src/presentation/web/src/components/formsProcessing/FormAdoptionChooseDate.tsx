import React, { useContext } from "react";
import {
    Divider,
    Theme,
    Typography,
    Paper,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import Calendar from "../calendar/Calendar";
import { useGetAllAdoptionSteps, useGetAllVisits, useGetAnimalSubmission } from "../../client";
import { useHistory } from "react-router-dom";
import AdoptionStepper from "../common/stepper/AdoptionStepper";
import LoadingCircle from "../loadingCircle/LoadingCircle";
import { AppCtx } from "../../App";
import TimePicker from "../timePicker/TimePicker";
import VisitForm from "../forms/visitForm/VisitForm";

interface StepperWrapperProps {
    animalId: number;
    reviewDate?: string;
}

const useStyle = makeStyles((theme: Theme) => ({
    divider: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        width: "100%",
    },
    paper: {
        width: '100%',
        padding: '2rem 2rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
}));

const StepperWrapper: React.FC<StepperWrapperProps> = ({ animalId, reviewDate }) => {
    const classes = useStyle();
    const requestOptions = { headers: { access_token: localStorage.getItem('apiKey') ?? '' } };

    const { location } = useHistory();
    const { data: adoptionStepsData, loading: adoptionStepsLoading } = useGetAllAdoptionSteps({ animalId, requestOptions });

    const currentStep = parseInt(location.pathname.split('/').slice(-1).join(''));
    return <>{
        !adoptionStepsLoading && adoptionStepsData 
        ?
            <>
                <AdoptionStepper adoptionSteps={adoptionStepsData.map((step) => step.name)} currentStep={currentStep} />
                <Typography variant="h5">
                    Gratulacje!
                </Typography>
                <Typography variant="body1">
                    {adoptionStepsData[currentStep - 1].description}
                </Typography>
                <Divider className={classes.divider} />
                <Typography variant="body1">
                    Data zaakceptowania wniosku: {reviewDate}
                </Typography>
            </>
        :
            <LoadingCircle />
        }
    </>  
}

const FormAdoptionChooseDate = () => {
    const requestOptions = { headers: { access_token: localStorage.getItem('apiKey') ?? '' } };

    const classes = useStyle();
    const { appState } = useContext(AppCtx);
    const { data: submissionData, loading: submissionLoading } = useGetAnimalSubmission({ userId: appState.userId!, requestOptions });
    const { data: visitsData, loading: visitsLoading } = useGetAllVisits({ requestOptions });

    const handleDate = (date: Date) => {
        console.log(date.getFullYear);
        console.log(visitsData![0].date);
    };

    return (
        <Paper className={classes.paper}>
            {!submissionLoading && !visitsLoading && visitsData && submissionData 
                ? 
                    <>  
                        <Typography variant="body1">
                            Pracownik akceptujący(a): {submissionData.reviewer?.user.name}
                        </Typography>
                        <Divider className={classes.divider} />
                        <Typography variant="body1" >
                            Zaznacz na kalendarzu datę i godzinę wizyty w schronisku. Musi się ona
                            odbyć w godzinach pracy schroniska i w przeciągu 2 tygodni od rozpatrzenia
                            wniosku. Pamiętaj jeżeli nie pojawisz się w schronisku w danym czasie
                            prawdopodobnie zwierzę zostanie przydzielone innej osobie ubiegającej się,
                            a ty będziesz musiał(a) rozpocząć proces adopcyjny od początku.
                        </Typography>
                        <VisitForm animalId={submissionData.animal.id} />
                    </>
                :
                    <LoadingCircle />
            }
        </Paper>
    );
};

export default FormAdoptionChooseDate;
