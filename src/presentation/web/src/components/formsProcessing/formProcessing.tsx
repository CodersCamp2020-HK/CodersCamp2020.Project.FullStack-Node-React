import React from "react";
import { useState } from "react";
import {
  Grid,
  Divider,
  Theme,
  useTheme,
  Typography,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

interface Props {
  description: string;
  formSentDate: string;
}

const useStyle = makeStyles((theme: Theme) => ({
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

const FormProcessing = (props: Props) => {
  const classes = useStyle();
  const theme = useTheme();
  const [showApplication, setShowApplication] = useState(false);
  const handleButton = () => {
    setShowApplication(!showApplication);
  };
  return (
    <Grid item>
      <Typography variant="h5" align="center">
        Rozpatrujemy twój wniosek
      </Typography>
      <Typography variant="body1" align="center">
        {props.description}
      </Typography>
      <Divider className={classes.divider} />
      <Typography variant="body1" align="center">
        Data wysłania wniosku: {props.formSentDate}
      </Typography>
      <Divider className={classes.divider} />
      <div className={classes.buttonsWrapper}>
        {/* <Button
          variant="outlined"
          color="primary"
          size="medium"
          fullWidth={true}
          // onClick={props.btnDeleteForm}
        >
          Usuń wniosek
        </Button> */}
        <Button
          variant="outlined"
          color="primary"
          size="medium"
          fullWidth={true}
          onClick={handleButton}
        >
          {showApplication ? "Zwiń wysłany wniosek" : "Rozwiń wysłany wnisoek"}
        </Button>
        <Divider className={classes.divider} />
        {showApplication && <div>Lololololol</div>}
      </div>
    </Grid>
  );
};

export default FormProcessing;
