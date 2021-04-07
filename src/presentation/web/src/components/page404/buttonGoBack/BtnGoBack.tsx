import React from "react";
import { Button } from "@material-ui/core";
import { UndoRounded } from "@material-ui/icons";
import { Link as RouterLink } from "react-router-dom";
import { Link } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const BtnGoBack = () => {
  let history = useHistory();
  return (
      <Button
        variant="outlined"
        color="primary"
        size="large"
        fullWidth={true}
        endIcon={<UndoRounded>Go back</UndoRounded>}
        onClick={() => history.goBack()}
      >
        Wróc do poprzedniej strony
      </Button>
  );
};

export default BtnGoBack;
