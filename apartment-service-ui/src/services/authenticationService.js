import {
  getBaseUrl,
  getHeaders,
  throwErrorOnBadRequests,
} from "./serviceUtils";
import { REST_RESOURCES } from "./apiConfig";

export function login(req) {
  return fetch(`${getBaseUrl()}/${REST_RESOURCES.USERS}/login`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({
      email: req.email,
      password: req.password,
    }),
  })
    .then((response) => response.json())
    .then((res) => {
      throwErrorOnBadRequests(res);
      return res;
    })
}
