import React, { useContext } from "react";
import { Redirect, Route} from "react-router";
import { AuthContext } from "../Context/context";

export function PrivateRoute({ children, ...rest }) {
  const obj = useContext(AuthContext);
  const token = obj?.authInfo?.token;
  return (
    <Route
      {...rest}
      render={() => {
        if (token) return children;
        return (
          <Redirect to = "/login"/>
        );
      }}
    />
  );
}
