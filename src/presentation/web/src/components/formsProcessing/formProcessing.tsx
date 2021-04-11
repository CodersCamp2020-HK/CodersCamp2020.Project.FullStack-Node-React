import React from "react";
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
   btnDisplayForm: () => any;
   btnDeleteForm: () => Promise<void>;
}

const useStyle = makeStyles((theme: Theme) => ({
  divider: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    width: "100%",
  },
  buttonsWrapper: {
    width: "300px",
    '& > *': {
    marginTop: theme.spacing(2),
  },
},
}));

const FormProcessing = (props: Props) => {
  const classes = useStyle();
  const theme = useTheme();

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
        <Button
          variant="outlined"
          color="primary"
          size="medium"
          fullWidth={true}
           onClick={props.btnDeleteForm}
        >
          Usuń wniosek
        </Button>
        <Button
          variant="outlined"
          color="primary"
          size="medium"
          fullWidth={true}
           onClick={props.btnDisplayForm}
        >
          Zobacz wysłany wniosek
        </Button>
      </div>
    </Grid>
  );
};

export default FormProcessing;
