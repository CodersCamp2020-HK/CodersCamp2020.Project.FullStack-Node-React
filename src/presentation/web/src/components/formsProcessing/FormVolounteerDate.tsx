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
  meetingDate: string;
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
        Data najbliższego spotkania wolontariuszy: {props.meetingDate}
      </Typography>
      <Divider className={classes.divider} />
      Pamiętaj jeżeli nie pojawisz się w schronisku w danym czasie to twoja
      kandydatura automatycznie zostanie odrzucona, a ty będziesz musiał(a)
      rozpocząć proces adopcyjny od początku.
    </Grid>
  );
};

export default FormAdoptionChooseDate;
