import React from "react";
import { Button, Grid, Theme, Typography, useTheme } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import PawIcon404 from "./img/PawIcon404";
import AnimationPaws from "./animationPaws/AnimationPaws";
import CatPhoto from "./img/cat1.png";
import DogPhoto from "./img/dog1.png";
import Hidden from "@material-ui/core/Hidden";
import BtnGoBack from './buttonGoBack/BtnGoBack'
import BtnMainPage from './buttonMainPage/BtnMainPage'

const Page404 = () => {
  const theme = useTheme<Theme>();
  const useStyle = makeStyles({
    wrapper: {
      display: "flex",
    },
    wrapper404: {
      "& > *": {
        marginTop: theme.spacing(2),
      },
    },
    dogCatPhotos: {
      display: "flex",
      justifyContent: "space-between",
      marginTop: theme.spacing(2),
    },
    photoCat: {
      width: "50%",
      height: "20vh",
      backgroundPosition: "left",
      backgroundSize: "contain",
      backgroundImage: `url(${CatPhoto})`,
      backgroundRepeat: "no-repeat",
      marginLeft: theme.spacing(2),
    },
    animation: {
      height: "100%",
    },
    photoDog: {
      width: "30%",
      height: "20vh",
      backgroundPosition: "right",
      backgroundSize: "contain",
      backgroundImage: `url(${DogPhoto})`,
      backgroundRepeat: "no-repeat",
      marginRight: theme.spacing(2),
    },
  });

  const classes = useStyle();

  return (
    <Grid container xs={12} className={classes.wrapper}>
      <Grid item xs={1} className={classes.animation}>
        <Hidden xsDown>
          <AnimationPaws />
        </Hidden>
      </Grid>
      <Grid
        container
        item
        direction="column"
        xs={10}
        justify="center"
        className={classes.wrapper404}
      >
        <Grid
          container
          item
          direction="column"
          xs={12}
          sm={10}
          md={8}
          lg={6}
          justify="center"
          className={classes.wrapper404}
        >
          <PawIcon404
            color={theme.palette.primary.main}
            width={160}
            height={160}
            colorText="white"
          />
          <Typography variant="h6" align="center">
            Strona nie została odnaleziona
          </Typography>
          <Typography variant="h5" align="center">
            Co tutaj robisz? Zgubiłeś/aś się?
          </Typography>
          <BtnGoBack/>
          <BtnMainPage/>
        </Grid>
        <Grid container item xs={12} className={classes.dogCatPhotos}>
          <div className={classes.photoCat} />
          <div className={classes.photoDog} />
        </Grid>
      </Grid>
      <Grid item xs={1} className={classes.animation}>
        <Hidden xsDown>
          <AnimationPaws />
        </Hidden>
      </Grid>
    </Grid>
  );
};

export default Page404;
