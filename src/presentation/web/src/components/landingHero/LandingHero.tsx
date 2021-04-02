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
import AnimationPaws from "../animationPaws/AnimationPaws";
import Hidden from "@material-ui/core/Hidden";

const useStyles = makeStyles((theme) => ({
  photoLanding: {
    backgroundImage: `url(${PhotoLanding})`,
    backgroundPosition: "top",
    backgroundSize: "cover",
    width: `100vw`,
    height: "95vh",
    display: "flex",
    boxSizing: "border-box",
    justifyContent: "center",
  },
  wrapper: {
    display: "flex",
    justifyContent: "space-between",
    maxWidth: "1280px",
  },
  headerContainer: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    alignItems: "center",
  },
  button: {
    marginTop: theme.spacing(4),
    background: theme.palette.secondary.dark,
  },
  link: {
    width: "70%",
  },
  header: {
    color: theme.palette.secondary.dark,
  },
}));

const LandingHero = () => {
  const classes = useStyles();
  return (
    <div className={classes.photoLanding}>
      <Grid container xs={12} className={classes.wrapper}>
        <Grid item xs={1}>
          <Hidden xsDown>
            <AnimationPaws />
          </Hidden>
        </Grid>
        <Grid
          container
          item
          xs={12}
          sm={10}
          md={8}
          lg={6}
          justify="center"
          className={classes.headerContainer}
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
          <Link component={RouterLink} to="/adoption" className={classes.link}>
            <Button
              color="secondary"
              variant="contained"
              type="submit"
              className={classes.button}
              fullWidth={true}
            >
              O procesie adopcyjnym
            </Button>
          </Link>
        </Grid>
        <Grid item xs={1}>
          <Hidden xsDown>
            <AnimationPaws />
          </Hidden>
        </Grid>
      </Grid>
    </div>
  );
};

export default LandingHero;
