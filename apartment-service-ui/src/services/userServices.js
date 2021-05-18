import { REST_RESOURCES } from "./apiConfig";
import {
  getBaseUrl,
  getHeaders,
  throwErrorOnBadRequests,
} from "./serviceUtils";

export function addUser(user) {
  return fetch(`${getBaseUrl()}/${REST_RESOURCES.USERS}`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(user),
  })
    .then((response) => response.json())
    .then((res) => {
      throwErrorOnBadRequests(res);
      return res;
    });
}

export function getUsers(page = 1, limit = 10) {
  return fetch(
    `${getBaseUrl()}/${REST_RESOURCES.USERS}?page=${page}&limit=${limit}`,
    {
      method: "GET",
      headers: getHeaders(),
    }
  )
    .then((response) => response.json())
    .then((res) => {
      throwErrorOnBadRequests(res);
      return res;
    });
}

export function deleteUser(user) {
  const { _id, ...rest } = user;
  return fetch(`${getBaseUrl()}/${REST_RESOURCES.USERS}/${_id}`, {
    method: "DELETE",
    headers: getHeaders(),
    body: JSON.stringify(rest),
  }).then((res) => {
    if (!res.ok) {
      return res.json().then((response) => throwErrorOnBadRequests(response));
    } else {
      return res;
    }
  });
}

export function editUser(user) {
  const { _id, ...rest } = user;
  return fetch(`${getBaseUrl()}/${REST_RESOURCES.USERS}/${_id}`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(rest),
  })
    .then((response) => response.json())
    .then((res) => {
      throwErrorOnBadRequests(res);
      return res;
    });
}

export function signup(user) {
  return fetch(`${getBaseUrl()}/${REST_RESOURCES.USERS}/signup`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(user),
  })
    .then((response) => response.json())
    .then((res) => {
      throwErrorOnBadRequests(res);
      return res;
    });
}
