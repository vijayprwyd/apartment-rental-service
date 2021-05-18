import React, { useContext } from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import { DashboardContext } from "../../Context/context";

export default function ViewFilter() {
  const { apartmentViewType, updateDashboardState } = useContext(
    DashboardContext
  );
  const handleChange = (event) => {
    updateDashboardState(
      event.target.checked ? "SET_LIST_VIEW" : "SET_MAP_VIEW"
    );
  };

  return (
    <FormControlLabel
      control={
        <Switch
          checked={apartmentViewType === "LIST_VIEW"}
          onChange={handleChange}
          name="listViewChecked"
          color="primary"
        />
      }
      label={apartmentViewType === "LIST_VIEW" ? "List View" : "Map View"}
    />
  );
}
