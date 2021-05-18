import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import { SignupForm } from "../../Entry/Signup/SignupForm";

const useStyles = makeStyles(() => ({
  textfield: {
    display: "block",
    marginBottom: "20px",
  },
  dialog: {
    overflowX: "hidden",
  },
}));

export function UpsertUserDialog({ onClose, user, onSuccess }) {
  const classes = useStyles();

  return (
    <div>
      <Dialog open={true} onClose={onClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">
          {user ? "Edit User" : "Add User"}{" "}
        </DialogTitle>
        <DialogContent className={classes.dialog}>
          <SignupForm
            adminUser={true}
            userToUpdate={user}
            onSuccess={onSuccess}
            isUpsertFlow = {true}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
