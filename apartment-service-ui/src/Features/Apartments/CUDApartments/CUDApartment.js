import React, { useContext, useEffect, useRef } from "react";
import { DashboardContext } from "../../../Context/context";
import { UpsertApartmentDialog } from "./UpsertApartment/UpsertApartmentDialog";
import { DeleteApartmentDialog } from "./DeleteApartment/DeleteApartment";
import { useDelayUnmount } from "../../../hooks/useDelayUnmount";

export function CUDApartment() {
  const {
    apartmentChangeAction,
    selectedApartment,
    updateDashboardState,
  } = useContext(DashboardContext);


  function handleClose() {
    updateDashboardState("CLOSE_UPSERT_APARTMENT_DIALOG");
  }

  function handleSuccess() {
    updateDashboardState(`${apartmentChangeAction}_SUCCESS`);
  }

  const apartmentActionRef = useRef(apartmentChangeAction);
  useEffect(() => {
    apartmentActionRef.current = apartmentChangeAction
  }, [apartmentChangeAction])

  const shouldRenderChild = useDelayUnmount(!!apartmentChangeAction, 1000);
  if (!shouldRenderChild) return null;

  if (
    apartmentActionRef.current === "ADD_APARTMENT" ||
    apartmentActionRef.current === "EDIT_APARTMENT"
  ) {
    return (
      <UpsertApartmentDialog
        action={apartmentChangeAction}
        apartment={selectedApartment}
        onClose={handleClose}
        onSuccess={handleSuccess}
      />
    );
  }

  return (
    <DeleteApartmentDialog
      apartment={selectedApartment}
      onClose={handleClose}
      onSuccess={handleSuccess}
      open = {!!apartmentChangeAction}
    />
  );
}
