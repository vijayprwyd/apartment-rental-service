import React, { useState } from "react";
import { DashboardContext } from "../Context/context";

export function DashboardStateProvider({ children }) {
  const [apartmentViewType, setApartmentViewType] = useState("LIST_VIEW");
  const [currentPage, setCurrentPage] = useState(1);
  const [apartmentChangeAction, setApartmentChangeAction] = useState(null);
  const [latestStatus, setLatestStatus] = useState(null);
  const [selectedApartment, setSelectedApartment] = useState(null);

  function updateDashboardState(eventName, options) {
    switch (eventName) {
      case "SET_MAP_VIEW":
        setApartmentViewType("MAP_VIEW");
        break;

      case "SET_LIST_VIEW":
        setApartmentViewType("LIST_VIEW");
        break;

      case "NAVIGATE_NEXT_PAGE":
        setCurrentPage(currentPage + 1);
        break;

      case "NAVIGATE_PREVIOUS_PAGE":
        setCurrentPage(currentPage - 1);
        break;
      
      case 'RESET_PAGE':
        setCurrentPage(1);
        break;

      case "ADD_APARTMENT":
        setApartmentChangeAction(eventName);
        break;

      case "EDIT_APARTMENT":
        setSelectedApartment(options.apartment);
        setApartmentChangeAction(eventName);
        break;

      case "DELETE_APARTMENT":
        setSelectedApartment(options.apartment);
        setApartmentChangeAction(eventName);
        break;

      case "CLOSE_UPSERT_APARTMENT_DIALOG":
        setApartmentChangeAction(null);
        setSelectedApartment(null);
        break;

      case "ADD_APARTMENT_SUCCESS":
      case "EDIT_APARTMENT_SUCCESS":
      case "DELETE_APARTMENT_SUCCESS":
        setApartmentChangeAction(null);
        setSelectedApartment(null);
        setLatestStatus(eventName);
        break;

      case "APARTMENT_STATUS_UPDATE_VIEWED":
        setLatestStatus(null);
        break;

      default:
        return;
    }
  }

  return (
    <DashboardContext.Provider
      value={{
        updateDashboardState,
        apartmentViewType,
        page: currentPage,
        apartmentChangeAction,
        selectedApartment,
        latestStatus,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}
