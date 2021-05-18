import React, { useContext } from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { useHistory, useLocation } from "react-router-dom";
import { AuthContext, DashboardContext } from "../../Context/context";
import {
  hasApartmentUpdateAccess,
  hasUpdateUserAccess,
} from "../../utils/authUtils";

export default function SimpleMenu() {
  const obj = useContext(DashboardContext);
  const [anchorEl, setAnchorEl] = React.useState(false);
  const { authInfo, deleteAuthInfo } = useContext(AuthContext);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const history = useHistory();
  const location = useLocation();

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuButtonClick = (eventName) => {
    switch (eventName) {
      case "Add Apartment":
        obj.updateDashboardState("ADD_APARTMENT");
        break;
      case "Manage Users":
        history.push("/users");
        break;
      case "Manage Apartments":
        history.push("/feed");
        break;
      case "Logout":
        deleteAuthInfo();
        break;
      default:
        break;
    }
    setAnchorEl(null);
  };

  return (
    <>
      <div>
        <Button
          color="inherit"
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          Options
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          MenuListProps = {{disableScrollLock: true}}
          disableScrollLock>
          {location.pathname === "/feed" &&
            hasApartmentUpdateAccess(authInfo?.role) && (
              <MenuItem onClick={() => handleMenuButtonClick("Add Apartment")}>
                Add Apartment
              </MenuItem>
            )}

          {location.pathname === "/feed" &&
            hasUpdateUserAccess(authInfo?.role) && (
              <MenuItem onClick={() => handleMenuButtonClick("Manage Users")}>
                Manage Users
              </MenuItem>
            )}

          {location.pathname === "/users" && (
            <MenuItem
              onClick={() => handleMenuButtonClick("Manage Apartments")}
            >
              Manage Apartments
            </MenuItem>
          )}
          <MenuItem onClick={() => handleMenuButtonClick("Logout")}>
            Logout
          </MenuItem>
        </Menu>
      </div>
    </>
  );
}
