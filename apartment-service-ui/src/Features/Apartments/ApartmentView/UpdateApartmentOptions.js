import React, { useContext } from "react";
import IconButton from "@material-ui/core/IconButton";
import { AuthContext, DashboardContext } from "../../../Context/context";
import { hasApartmentUpdateAccess } from "../../../utils/authUtils";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";

export function UpdateApartmentOptions({ apartment }) {
  const { authInfo } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = React.useState(false);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const { updateDashboardState } = useContext(DashboardContext);
  const handleButtonClick = (eventName) => {
    switch (eventName) {
      case "Edit Apartment":
        updateDashboardState("EDIT_APARTMENT", { apartment });
        break;
      case "Delete Apartment":
        updateDashboardState("DELETE_APARTMENT", { apartment });
        break;
      default:
        break;
    }
    handleClose();
  };

  return (
    <>
      {hasApartmentUpdateAccess(authInfo?.role) && (
        <div className="aUpdate">
          <IconButton color="primary" onClick={handleClick}>
            <MoreHorizIcon />
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            MenuListProps={{ disableScrollLock: true }}
            disableScrollLock
          >
            <MenuItem onClick={() => handleButtonClick("Edit Apartment")}>
              Edit
            </MenuItem>
            <MenuItem onClick={() => handleButtonClick("Delete Apartment")}>
              Delete
            </MenuItem>
          </Menu>
        </div>
      )}
    </>
  );
}
