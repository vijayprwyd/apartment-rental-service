import { useContext } from "react";
import { AuthContext } from "../Context/context";
import { Redirect } from "react-router-dom";

export function RestrictRoute({ children, allowedRoles = [] }) {
  const authContext = useContext(AuthContext);
  const role = authContext?.authInfo?.role;

  if (allowedRoles.includes(role)) {
    return children;
  } else {
    return <Redirect to="/feed" />;
  }
}
