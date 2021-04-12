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
  formApprovedDate: string;
  workerName: string;
}

const useStyle = makeStyles((theme: Theme) => ({
  divider: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    width: "100%",
  },
}));

const FormAdoptionChooseDate = (props: Props) => {
  const classes = useStyle();
  const theme = useTheme();

  return (
    <Grid item>
      <Typography variant="h5" align="center">
        Gratulację!
      </Typography>
      <Typography variant="body1" align="center">
        {props.description}
      </Typography>
      <Divider className={classes.divider} />
      <Typography variant="body1" align="center">
        Data zaakceptowania wniosku: {props.formApprovedDate}
      </Typography>
      <Typography variant="body1" align="center">
        Pracownik akceptująca: {props.workerName}
      </Typography>
      <Divider className={classes.divider} />
      <Typography variant="body1" >
        Pracownik akceptująca: {props.workerName}
      
      Zaznacz na kalendarzu datę i godzinę wizyty w schronisku. Musi się ona
      odbyć w godzinach pracy schroniska i w przeciągu 2 tygodni od rozpatrzenia
      wniosku. Pamiętaj jeżeli nie pojawisz się w schronisku w danym czasie
      prawdopodobnie zwierzę zostanie przydzielone innej osobie ubiegającej się,
      a ty będziesz musiał(a) rozpocząć proces adopcyjny od początku.
      </Typography>
    </Grid>
  );
};

export default FormAdoptionChooseDate;
