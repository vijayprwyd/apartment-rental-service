import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Slide from "@material-ui/core/Slide";
import { Alert, AlertTitle } from "@material-ui/lab";
import { DialogContent } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export function ApartmentsErrorView() {
  const classes = useStyles();

  return (
    <div>
      <Dialog fullScreen open TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar></Toolbar>
        </AppBar>
        <DialogContent>
          <Alert severity="error" className={classes.error}>
            <AlertTitle>Unable to fetch apartments</AlertTitle>
            Please <a href="/feed">refresh</a> the page or come again later
          </Alert>
        </DialogContent>
      </Dialog>
    </div>
  );
}
