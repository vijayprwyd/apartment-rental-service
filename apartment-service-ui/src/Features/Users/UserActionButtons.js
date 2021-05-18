import React, { useContext } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import { UserContext } from "../../Context/context";

export function UserActionButtons({ user }) {
  const { updateUserAction } = useContext(UserContext);

  return (
    <>
      <IconButton
        color="primary"
        onClick={() => updateUserAction("EDIT_USER", { user })}
      >
        <EditIcon />
      </IconButton>
      <IconButton
        color="primary"
        onClick={() => updateUserAction("DELETE_USER", { user })}
      >
        <DeleteIcon />
      </IconButton>
    </>
  );
}
