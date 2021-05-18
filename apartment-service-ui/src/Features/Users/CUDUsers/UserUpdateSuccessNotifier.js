import React, { useContext } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import { UserContext } from "../../../Context/context";

function getSnackbarMessage(status) {
  switch (status) {
    case "EDIT_USER_SUCCESS":
      return "User successfully updated";
    case "DELETE_USER_SUCCESS":
      return "User successfully deleted";
    case "ADD_USER_SUCCESS":
      return "User successfully added";
    default:
      return "";
  }
}

export function UserUpdateSuccessNotifier() {
  const { latestStatus, updateUserAction } = useContext(UserContext);

  if (!latestStatus) return null;
  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      open
      onClose={() => updateUserAction("USER_UPDATE_STATUS_VIEWED")}
      message={getSnackbarMessage(latestStatus)}
    />
  );
}
