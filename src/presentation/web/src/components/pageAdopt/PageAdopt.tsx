import React from "react";
import { Grid, Theme, Typography, useTheme, Hidden } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import PawIcon from "../animationPaws/img/PawIcon";
import AdoptionStepCard from "./adoptionStepCard/AdoptionStepCard";
import stepsArray from "./adoptionStepCard/AdoptionSteps";

const useStyle = makeStyles((theme: Theme) => ({
  wrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "70px 0 70px 0",
  },
  header: {
    display: "flex",
    width: '100%',
    alignItems: "center",
    justifyContent: "space-between",
  },
  cards: {
    "& > *": {
      marginTop: theme.spacing(3),
    },
  },
}));

const PageAdopt = () => {
  const classes = useStyle();
  const theme = useTheme();

  return (
    <Grid container item xs={12} className={classes.wrapper}>
      <Grid item className={classes.header}>
        <Hidden xsDown>
          <PawIcon
            color={theme.palette.primary.main}
            width={100}
            height={100}
          />
        </Hidden>
        <Typography variant="h3" align="center" color="secondary" >
          PROCES ADOPCYJNY
        </Typography>
        <Hidden xsDown>
          <PawIcon
            color={theme.palette.secondary.main}
            width={100}
            height={100}
          />
        </Hidden>
      </Grid>
      <Grid item className={classes.cards}>
        {stepsArray.map((t) => (
          <AdoptionStepCard
            color={t.color}
            title={t.title}
            description={t.description}
            numberOfCard={t.numberOfCard}
          />
        ))}
      </Grid>
    </Grid>
  );
};

export default PageAdopt;
