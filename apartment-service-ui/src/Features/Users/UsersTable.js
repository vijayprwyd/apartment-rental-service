import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import { capitalizeString } from "../../utils/stringUtils";
import { UserActionButtons } from "./UserActionButtons";
import { Alert, AlertTitle } from "@material-ui/lab";

const useStyles = makeStyles({
  tableCell: {
    padding: "10px",
  },
  tableActions: {
    display: "flex",
  },
  table: {
    overflowX: "scroll",
  },
});

export function UsersTable({ users = [], userResponseInfo }) {
  const classes = useStyles();
  const { loading, isPreviousData, isStale, error } = userResponseInfo;

  if (error) {
    return (
      <Alert severity="error" className={classes.error}>
        <AlertTitle>Unable to fetch users</AlertTitle>
        Please refresh this page or try again later !!
      </Alert>
    );
  }

  return (
    <TableContainer component={Paper} style={{ marginBottom: "20px" }}>
      {(loading || isPreviousData || isStale) && <LinearProgress />}

      <Table className={classes.table} aria-label="users table">
        <TableHead>
          <TableRow>
            <TableCell align="left">User Name</TableCell>
            <TableCell align="left">Email</TableCell>
            <TableCell align="left">Role</TableCell>
            <TableCell align="left">Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody className={classes.tableBody}>
          {!loading &&
            users.map((user) => {
              return (
                <TableRow key={user._id}>
                  <TableCell
                    className={classes.tableCell}
                    align="left"
                  >{`${user.firstName} ${user.lastName}`}</TableCell>
                  <TableCell className={classes.tableCell} align="left">
                    {user.email}
                  </TableCell>
                  <TableCell className={classes.tableCell} align="left">
                    {capitalizeString(user.role)}
                  </TableCell>
                  <TableCell className={classes.tableCell} align="right">
                    <div className={classes.tableActions}>
                      <UserActionButtons user={user} />
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
