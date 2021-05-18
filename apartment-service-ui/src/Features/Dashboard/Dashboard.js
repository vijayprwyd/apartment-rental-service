import React from "react";
import { ApartmentFeed } from "../Apartments/ApartmentFeed";
import { CUDApartment } from "../Apartments/CUDApartments/CUDApartment";
import { AppToolbar } from "../AppToolbar/AppToolbar";
import { SnackbarNotifier } from "../CrudSuccessNotifier/SnackbarNotifier";
import { Filters } from "../Filters/Filters";
import "./dashboard.css";

export function Dashboard() {
  return (
    <>
      <SnackbarNotifier/>
      <CUDApartment/>
      <div className="mainWidget">
        <AppToolbar />
        <div className="feed">
          <div className="sidebar">
            <div className = 'sidebarFilter'>
              <Filters/>
            </div>
          </div>
          <ApartmentFeed />
        </div>
      </div>
    </>
  );
}
