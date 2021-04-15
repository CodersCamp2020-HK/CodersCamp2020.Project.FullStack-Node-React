import React, { useContext } from "react";
import { useState } from "react";
import {
    Paper,
    Divider,
    Theme,
    Typography,
    Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useGetAnimalSubmission } from "../../client";
import { AppCtx } from "../../App";
import LoadingCircle from "../loadingCircle/LoadingCircle";

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
}));

const FormProcessing = () => {
    const requestOptions = { headers: { access_token: localStorage.getItem('apiKey') ?? '' } };
    const handleButton = () => setShowApplication(!showApplication);

    const { appState } = useContext(AppCtx);
    const classes = useStyle();
    const [showApplication, setShowApplication] = useState(false);
    const { data, loading } = useGetAnimalSubmission({ userId: appState.userId!, requestOptions });

    return (
        <Paper className={classes.paper}>
            {!loading && data 
                ? 
                    <>
                        <Typography variant="h5" align="center">
                            Rozpatrujemy twój wniosek
                        </Typography>
                        <Typography variant="body1" align="center">
                            {'OPIS KROKU'}
                        </Typography>
                        <Divider className={classes.divider} />
                        <Typography variant="body1" align="center">
                            Data wysłania wniosku: {data.submissionDate}
                        </Typography>
                        <Divider className={classes.divider} />
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
                        {showApplication && <div>Lololololol</div>}
                    </>
                :
                    <LoadingCircle />
            }
        </Paper>
    );
};

export default FormProcessing;