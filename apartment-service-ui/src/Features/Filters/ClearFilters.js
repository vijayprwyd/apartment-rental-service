import React, { useContext } from "react";
import { IconButton } from "@material-ui/core";
import { ApartmentFilterContext } from "../../Context/context";
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import Tooltip from "@material-ui/core/Tooltip";

import "./filters.css";

export function ClearFilters() {
  const { clearFilters } = useContext(ApartmentFilterContext);

  return (
    <div className="filterButton">
            <Tooltip title= 'Reset'>

      <IconButton
        style={{ margin: "10px auto", position: "absolute", top: "-10px", right: "10px" }}
        variant="contained"
        color="primary"
        onClick={clearFilters}
      >
        <RotateLeftIcon>Reset</RotateLeftIcon>
      </IconButton>
      </Tooltip>
    </div>
  );
}
