import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Login } from "../Features/Entry/Login/Login";
import { Signup } from "../Features/Entry/Signup/Signup";
import { Dashboard } from "../Features/Dashboard/Dashboard";
import { Users } from "../Features/Users/Users";
import { PrivateRoute } from "./PrivateRoute";
import { RedirectLoggedinUsers } from "./RedirectAuthenticatedUsers";
import { RestrictRoute } from "./RestrictRoute";
import { USER_ROLES } from "../constants/userRoleConstants";

export function AppRoutes() {
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <RedirectLoggedinUsers>
            <Login />
          </RedirectLoggedinUsers>
        </Route>
        <Route path="/signup">
          <RedirectLoggedinUsers>
            <Signup />
          </RedirectLoggedinUsers>
        </Route>
        <PrivateRoute path="/feed">
          <Dashboard />
        </PrivateRoute>
        <PrivateRoute path="/users">
          <RestrictRoute allowedRoles = {[USER_ROLES.ADMIN]}>
              <Users />
          </RestrictRoute>
        </PrivateRoute>
        <PrivateRoute path="/">
          <Redirect to="/feed" />
        </PrivateRoute>
        <Route path="*">
          <Redirect to="/feed" />
        </Route>
      </Switch>
    </Router>
  );
}
