import React, { useContext } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import { DashboardContext } from "../../Context/context";

function getSnackbarMessage(status) {
  switch (status) {
    case "ADD_APARTMENT_SUCCESS":
      return "Apartment successfully added";
    case "EDIT_APARTMENT_SUCCESS":
      return "Apartment successfully edited";
    case "DELETE_APARTMENT_SUCCESS":
      return "Apartment successfully deleted";
    default:
      return "";
  }
}

export function SnackbarNotifier() {
  const { latestStatus, updateDashboardState } = useContext(DashboardContext);

  if (!latestStatus) return null;
  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      open
      onClose={() => updateDashboardState("APARTMENT_STATUS_UPDATE_VIEWED")}
      message={getSnackbarMessage(latestStatus)}
    />
  );
}
