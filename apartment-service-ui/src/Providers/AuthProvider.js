import React, { useState } from "react";
import { AuthContext } from "../Context/context";
import { globalAuthObject } from "../utils/globalAuthManager";

const getInitialState = () => {
  try {
    return JSON.parse(localStorage.getItem("authInfo"));
  } catch (err) {
    return {};
  }
};

export function AuthPovider({ children }) {
  const [authInfo, setAuthInfo] = useState(getInitialState);

  function storeAuthInfo(obj) {
    const authInfo = {
      token: obj?.token,
      role: obj?.user?.role,
      email: obj?.user?.email,
    };

    globalAuthObject.setAuthInfo(authInfo);
    localStorage.setItem("authInfo", JSON.stringify(authInfo));
    setAuthInfo(authInfo);
  }

  function deleteAuthInfo() {
    localStorage.removeItem("authInfo");
    setAuthInfo(null);
    globalAuthObject.clearAuthInfo(null);
    window.location.reload();
  }

  return (
    <AuthContext.Provider
      value={{
        authInfo,
        storeAuthInfo,
        deleteAuthInfo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
