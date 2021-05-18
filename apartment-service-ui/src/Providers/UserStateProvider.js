import { useState } from "react";
import { UserContext } from "../Context/context";

export function UserProvider({ children }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [userAction, setUserAction] = useState(null);
  const [userToUpdate, setUserToUpdate] = useState(null);
  const [latestStatus, setLatestStatus] = useState(null);

  function updateUserAction(eventName, options) {
    switch (eventName) {
      case "ADD_USER":
      case "EDIT_USER":
      case "DELETE_USER":
        setUserAction(eventName);
        setUserToUpdate(options?.user);
        break;
      case "ADD_USER_SUCCESS":
      case "DELETE_USER_SUCCESS":
      case "EDIT_USER_SUCCESS":
        setLatestStatus(eventName);
        setUserAction(null);
        setUserToUpdate(null);
        break;
      case "CANCEL_USER_UPDATE":
        setUserAction(null);
        setUserToUpdate(null);
        break;
      case "USER_UPDATE_STATUS_VIEWED":
        setLatestStatus(null);
        break;
      default:
        break;
    }
  }

  function updateUserTableState(eventName) {
    switch (eventName) {
      case "NAVIGATE_NEXT_PAGE":
        setCurrentPage(currentPage + 1);
        break;
      case "NAVIGATE_PREVIOUS_PAGE":
        setCurrentPage(currentPage - 1);
        break;
      default:
        break;
    }
  }

  return (
    <UserContext.Provider
      value={{
        userId: null,
        email: null,
        page: currentPage,
        updateUserTableState,
        updateUserAction,
        userAction,
        userToUpdate,
        latestStatus,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
