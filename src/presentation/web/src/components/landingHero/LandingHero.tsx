import React from "react";
import {
  makeStyles,
  useTheme,
  Typography,
  Link,
  Grid,
  Button,
} from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import PhotoLanding from "./img/Landing-hero.jpg";

const useStyles = makeStyles((theme) => ({
  photoLanding: {
    backgroundImage: `url(${PhotoLanding})`,
    backgroundPosition: "top",
    backgroundSize: "cover",
    width: "100vw",
    height: "95vh",
    display: "flex",
    justifyContent: "center",
  },
  wrapper: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
  },
  button: {
    background: theme.palette.secondary.dark,
  },
  header: {
    color: theme.palette.secondary.dark,
  },
}));

const LandingHero = () => {
  const classes = useStyles();
  return (
    <div className={classes.photoLanding}>
      <Grid  container xs={12} justify="space-between">
        <Grid
          container
          item
          xs={12}
          sm={10}
          md={8}
          lg={6}
          justify="center"
          alignContent="center"
          className={classes.wrapper}
        >
          <Typography
            variant={"h3"}
            color="secondary"
            align="center"
            className={classes.header}
          >
            Jak adoptować
          </Typography>
          <Typography
            variant={"h3"}
            color="secondary"
            align="center"
            className={classes.header}
          >
            zwierzaka?
          </Typography>
          <Link component={RouterLink} to="/adoption">
            <Button
              color="secondary"
              variant="contained"
              type="submit"
              className={classes.button}
            >
              O procesie adopcyjnym
            </Button>
          </Link>
        </Grid>
      </Grid>
    </div>
  );
};

export default LandingHero;
