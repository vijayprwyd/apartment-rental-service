export const globalAuthObject = (function () {
  let authInfo;
  try {
    authInfo = JSON.parse(localStorage.getItem("authInfo"));
  } catch (err) {}

  return {
    setAuthInfo: function (authObj) {
      authInfo = authObj;
    },
    getAuthInfo: function () {
      return authInfo;
    },
    clearAuthInfo() {
      authInfo = null;
    },
  };
})();
