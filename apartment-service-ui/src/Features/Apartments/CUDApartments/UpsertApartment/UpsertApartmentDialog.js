import React from "react";
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";
import { UpsertApartment } from "./UpsertApartment";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
    display: "flex",
    justifyContent: "space-between",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export function UpsertApartmentDialog({
  action,
  apartment,
  onClose,
  onSuccess,
}) {
  const classes = useStyles();

  return (
    <div>
      <Dialog
        fullScreen
        open={!!action}
        onClose={onClose}
        TransitionComponent={Transition}
        disableScrollLock
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              {action === 'EDIT_APARTMENT' ? "Edit Apartment" : "Add Apartment"}
            </Typography>

            <IconButton
              edge="start"
              color="inherit"
              onClick={onClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        <UpsertApartment
          apartment={apartment}
          onSuccess={onSuccess}
        />
      </Dialog>
    </div>
  );
}
