import React from "react";
import { Theme, useTheme } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PawIcon from "./img/PawIcon";

const useStyle = makeStyles({
  pawWrapper: {
    display: "flex",
    width: "100%",
    height: "75vh",
    flexDirection: "column",
    justifyContent: "space-between",
    margin: '2vh 0 3vh 0'
  },

  "@keyframes stepAnimation": {
    "0%": {
      opacity: 0,
    },
    "10%": {
      opacity: 1,
    },
    "30%": {
      opacity: 0,
    },
    "100%": {
      opacity: 0,
    },
  },

  pairPaw: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",

    "& > div:first-child > svg": {
      transform: "rotate(-25deg) translateY(30px)",
    },
    "& > div:last-child > svg": {
      transform: "rotate(15deg)",
    },
  },

  pairPaw1: {
    animation: '5500ms $stepAnimation 3s ease-in-out infinite',
  },
  pairPaw2: {
    animation: '5500ms $stepAnimation 2.4s ease-in-out infinite',
  },
  pairPaw3: {
    animation: '5500ms $stepAnimation 1.8s ease-in-out infinite',
  },
  pairPaw4: {
    animation: '5500ms $stepAnimation 1.2s ease-in-out infinite',
  },
  pairPaw5: {
    animation: '5500ms $stepAnimation 0.6s ease-in-out infinite',
  },
  pairPaw6: {
    animation: '5500ms $stepAnimation 0s ease-in-out infinite',
  },
});

const AnimationPaws = () => {
  const theme = useTheme<Theme>();
  const classes = useStyle();

  return (
    <div className={classes.pawWrapper}>
      <div className={`${classes.pairPaw} ${classes.pairPaw1}`}>
        <PawIcon color={theme.palette.primary.dark} width={15} height={15} />
        <PawIcon color={theme.palette.primary.main} width={15} height={15} />
      </div>
      <div className={`${classes.pairPaw} ${classes.pairPaw2}`}>
        <PawIcon color={theme.palette.primary.light} width={15} height={15} />
        <PawIcon color={theme.palette.primary.dark} width={20} height={20} />
      </div>
      <div className={`${classes.pairPaw} ${classes.pairPaw3}`}>
        <PawIcon color={theme.palette.primary.main} width={20} height={20} />
        <PawIcon color={theme.palette.primary.dark} width={15} height={15} />
      </div>
      <div className={`${classes.pairPaw} ${classes.pairPaw4}`}>
        <PawIcon color={theme.palette.primary.dark} width={25} height={25} />
        <PawIcon color={theme.palette.primary.light} width={15} height={15} />
      </div>
      <div className={`${classes.pairPaw} ${classes.pairPaw5}`}>
        <PawIcon color={theme.palette.primary.main} width={15} height={15} />
        <PawIcon color={theme.palette.primary.dark} width={20} height={20} />
      </div>
      <div className={`${classes.pairPaw} ${classes.pairPaw6}`}>
        <PawIcon color={theme.palette.primary.main} width={15} height={15} />
        <PawIcon color={theme.palette.primary.dark} width={20} height={20} />
      </div>
    </div>
  );
};

export default AnimationPaws;
