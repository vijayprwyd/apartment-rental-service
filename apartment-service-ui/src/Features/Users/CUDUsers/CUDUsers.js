import React, { useContext } from "react";
import { UserContext } from "../../../Context/context";
import { DeleteUserDialog } from "./DeleteUserDialog";
import { UpsertUserDialog } from "./UpsertUserDialog";

export function CUDUsers() {
  const { userAction, userToUpdate, updateUserAction } = useContext(
    UserContext
  );

  function handleClose() {
    updateUserAction("CANCEL_USER_UPDATE");
  }

  function handleSuccess(eventName) {
    updateUserAction(eventName);
  }

  if (!userAction) return null;

  if (userAction === "ADD_USER" || userAction === "EDIT_USER")
    return (
      <UpsertUserDialog
        user={userToUpdate}
        onClose={handleClose}
        onSuccess={() => handleSuccess(`${userAction}_SUCCESS`)}
      />
    );

  return (
    <DeleteUserDialog
      open={!!userAction}
      onClose={handleClose}
      user={userToUpdate}
      onSuccess={() => handleSuccess("DELETE_USER_SUCCESS")}
    />
  );
}
