import React from "react";
import { Alert, AlertTitle } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    errorNotifier: {
      margin: "20px",
    },
  }));
  
export function NoMoreResultAlert() {
  const classes = useStyles();

  return (
    <Alert severity="warning" className = {classes.errorNotifier}>
      <AlertTitle>No More results to display</AlertTitle>
      Try changing the filters
    </Alert>
  );
}
