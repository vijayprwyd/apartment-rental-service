import { globalAuthObject } from "../utils/globalAuthManager";
import { HOST, PROTOCOL, VERSION } from "./apiConfig";

export function getBaseUrl() {
  return `${PROTOCOL}://${HOST}/api/${VERSION}`;
}

export function throwErrorOnBadRequests(response) {
  if (response.status === 'fail' || response.status === 'error') {
    let err = new Error(response.message);
    if(response.message === 'TokenExpiredError') {
      localStorage.removeItem('authInfo');
      window.location.reload();
      err.message = 'Please refresh the page';
    }
    err.response = response;
    err.status = response.status;
    throw err;
  }
}

export function getHeaders() {
  const authInfo = globalAuthObject.getAuthInfo();
    return {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${authInfo?.token}`,
      }
}