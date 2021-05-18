import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import MoreOptions from "./MoreOptions";
import { FilterMenuForSmallDevice } from "../Filters/FilterMenuForSmallDevice";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    cursor: "pointer",
  },
  link: {
    color: "inherit",
    fontFamily: "inherit",
    fontSize: "inherit",
    textDecoration: "none",
  },
}));

export function AppToolbar({ position }) {
  const classes = useStyles();
  const history = useHistory();

  return (
    <>
      <AppBar position={position || "fixed"}>
        <Toolbar>
          <FilterMenuForSmallDevice />
          <Typography
            variant="h6"
            className={classes.title}
            onClick={() => {
              history.push("/feed");
            }}
          >
            Apartment Rentals
          </Typography>
          <MoreOptions />
        </Toolbar>
      </AppBar>
    </>
  );
}
