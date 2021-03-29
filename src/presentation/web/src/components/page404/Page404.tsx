import React from "react";
import { Button, Grid, Theme, Typography, useTheme } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { UndoRounded, Menu } from "@material-ui/icons";
import PawIcon404 from "./img/PawIcon404";
import AnimationPaws from './animationPaws/AnimationPaws';
import CatPhoto from "./img/cat1.png";
import DogPhoto from "./img/dog1.png";

const Page404 = () => {
  const theme = useTheme<Theme>();
  const useStyle = makeStyles({
    wrapper: {
      justifyContent: "space-between",
    },
    wrapper404: {
      marginTop: "2vh",
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
      width: "100%",
      height: "15vh",
      backgroundPosition: "center",
      backgroundSize: "contain",
      backgroundImage: `url(${CatPhoto})`,
      backgroundRepeat: "no-repeat",
    },
    animation: {
      height: "100%",
    },
    photoDog: {
      width: "100%",
      height: "15vh",
      backgroundPosition: "center",
      backgroundSize: "contain",
      backgroundImage: `url(${DogPhoto})`,
      backgroundRepeat: "no-repeat",
    }
  });

  const classes = useStyle();
  
  return (
    <Grid container xs={12} className={classes.wrapper}>
      <Grid item xs={1} className={classes.animation}>
        <AnimationPaws/>
      </Grid>
      <Grid
        container
        item
        direction="column"
        xs={10}
        sm={8}
        md={6}
        lg={4}
        justify="center"
        className={classes.wrapper404}
      >
        <Grid item>
          <PawIcon404
            color={theme.palette.primary.main}
            width={160}
            height={160}
            colorText="white"
          />
        </Grid>
        <Typography variant="h6" align="center">
          Strona nie została odnaleziona
        </Typography>
        <Typography variant="h5" align="center">
          Co tutaj robisz? Zgubiłeś/aś się?
        </Typography>
        <Button
          variant="outlined"
          color="primary"
          size="large"
          fullWidth={true}
          endIcon={<UndoRounded>Go back</UndoRounded>}
        >
          Wróc do poprzedniej strony
        </Button>
        <Button
          variant="contained"
          color="primary"
          size="large"
          fullWidth={true}
          endIcon={<Menu>Go to main page</Menu>}
        >
          Przejdź do strony głównej
        </Button>
        <Grid container item xs={12} className={classes.dogCatPhotos}>
          <Grid item xs={5}>
            <div className={classes.photoCat} />
          </Grid>
          <Grid item xs={3}>
            <div className={classes.photoDog} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={1} className={classes.animation}>
        <AnimationPaws/>
      </Grid>
    </Grid>
  );
};

export default Page404;
