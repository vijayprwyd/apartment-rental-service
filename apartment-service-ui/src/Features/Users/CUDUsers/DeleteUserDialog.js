import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useMutation } from "react-query";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import { Alert, AlertTitle } from "@material-ui/lab";
import { deleteUser } from "../../../services/userServices";

const useStyles = makeStyles(() => ({
  loader: {
    color: "white",
  },
  error: {
    marginBottom: "20px",
  },
  submitButton: {
    minWidth: "90px",
  },
}));

export function DeleteUserDialog({ onClose, open, user, onSuccess }) {
  const classes = useStyles();

  const handleDelete = () => {
    mutate(user);
  };

  const {
    isLoading,
    isSuccess,
    isError,
    mutate,
    error,
  } = useMutation((user) => deleteUser(user));

  useEffect(() => {
    if (isSuccess) onSuccess();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);


  return (
    <div>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        disableBackdropClick
        disableScrollLock
      >
        <DialogTitle id="alert-dialog-title">
          {"Please confirm to delete"}
        </DialogTitle>
        <DialogContent>
          {isError && (
            <Alert severity="error" className={classes.error}>
              <AlertTitle>Submit Failed</AlertTitle>
              { error.message || 'Please try again later' }
            </Alert>
          )}
        </DialogContent>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You cannot undo the action
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>

          <Button
            color="primary"
            style={{ height: "46px" }}
            variant="contained"
            className={classes.submitButton}
            disabled={isLoading}
            onClick={handleDelete}
          >
            {isLoading ? (
              <CircularProgress className={classes.loader} />
            ) : (
              "Submit"
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
