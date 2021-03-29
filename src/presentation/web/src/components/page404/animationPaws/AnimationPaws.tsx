import React from "react";
import { Theme, useTheme } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PawIcon from "./img/PawIcon";

const useStyle = makeStyles({
  pawWrapper: {
    display: "flex",
    width: "100%",
    height: "80vh",
    flexDirection: "column",
    justifyContent: "space-between",
  },

 

  "@keyframes pawAnimation": {
    "0%": {
      opacity: 1,
    },
    "7%": {
      opacity: 0,
    },
    "100%": {
      opacity: 0,
    },
  },

  "@keyframes stepAnimation": {
    "0%": {
      opacity: 1,
    },
    "7%": {
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
    animation: `5000ms $stepsAnimation ease-in-out infinite`,

    "& > div:first-child > svg": {
      animation: `5000ms $pawAnimation ease-in-out infinite`,
      opacity: "0",
      transform: "rotate(-25deg) translateY(30px)",
    },
    "& > div:last-child > svg": {
      animation: `5000ms $pawAnimation ease-in-out infinite`,
      opacity: "0",
      transform: "rotate(15deg)",
      animationDelay: '100ms',
    },
  },
});

const PairPaws = () => {
  const theme = useTheme<Theme>();
  const classes = useStyle();

  return (
    <div className={classes.pairPaw}>
      <PawIcon color={theme.palette.primary.dark} width={15} height={15} />
      <PawIcon color={theme.palette.primary.dark} width={15} height={15} />
    </div>
  );
};

const AnimationPaws = () => {
  const theme = useTheme<Theme>();
  const classes = useStyle();

  return (
    <div className={classes.pawWrapper}>
      <PairPaws />
      <PairPaws />
      <PairPaws />
      <PairPaws />
      <PairPaws />
      <PairPaws />
      <PairPaws />
      <PairPaws />
      <PairPaws />
    </div>
  );
};

export default AnimationPaws;
