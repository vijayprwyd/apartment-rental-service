import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Filters } from "./Filters";
import { useLocation } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  list: {
    width: 250,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

function AppDrawer({ onClose }) {
  const classes = useStyles();

  return (
      <Drawer anchor="left" open={true} onClose={onClose}>
        <div className={clsx(classes.list)} role="presentation">
          <Filters />
        </div>
      </Drawer>
  );
}

export function FilterMenuForSmallDevice() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const classes = useStyles();

  function toggleDrawer() {
    setOpen(!open);
  }

  if(location.pathname !== "/feed") return null;

  return (
    <div className="apSm">
      {open && <AppDrawer onClose={toggleDrawer} />}

      <IconButton
        edge="start"
        className={classes.menuButton}
        color="inherit"
        aria-label="menu"
        onClick={toggleDrawer}
      >
        <MenuIcon />
      </IconButton>
    </div>
  );
}
