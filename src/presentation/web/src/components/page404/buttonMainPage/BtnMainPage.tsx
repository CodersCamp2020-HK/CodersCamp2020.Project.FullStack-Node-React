import React from "react";
import { Button } from "@material-ui/core";
import { Menu } from "@material-ui/icons";
import { Link as RouterLink } from "react-router-dom";
import { Link } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyle = makeStyles({
  wrapper: {
    width: '100%',
  },
})

const BtnMainPage = () => {
  const classes = useStyle();
  return (
    <Link component={RouterLink} to="/"  className={classes.wrapper}>
      <Button
        variant="contained"
        color="primary"
        size="large"
        fullWidth={true}
        endIcon={<Menu>Go to main page</Menu>}
      >
        Przejdź do strony głównej
      </Button>
    </Link>
  );
};

export default BtnMainPage;
