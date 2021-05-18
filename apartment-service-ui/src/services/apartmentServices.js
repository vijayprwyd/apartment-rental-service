import { constructQueryParamString } from "../utils/stringUtils";
import { REST_RESOURCES } from "./apiConfig";
import {
  getBaseUrl,
  getHeaders,
  throwErrorOnBadRequests,
} from "./serviceUtils";

export function editApartment(apartment) {
  const { _id, ...rest } = apartment;
  return fetch(`${getBaseUrl()}/${REST_RESOURCES.APARTMENTS}/${_id}`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(rest),
  })
    .then((response) => response.json())
    .then((response) => {
      throwErrorOnBadRequests(response);
      return response;
    });
}

export function addApartment(data) {
  return fetch(`${getBaseUrl()}/${REST_RESOURCES.APARTMENTS}`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((response) => {
      throwErrorOnBadRequests(response);
      return response;
    });
}

export function deleteApartment(apartment) {
  const { _id, ...rest } = apartment;
  return (
    fetch(`${getBaseUrl()}/${REST_RESOURCES.APARTMENTS}/${_id}`, {
      method: "DELETE",
      headers: getHeaders(),
      body: JSON.stringify(rest),
    })
      //.then((response) => response.json())
      .then((response) => {
        throwErrorOnBadRequests(response);
        return response;
      })
  );
}

export function getApartments(queryParams) {
  return fetch(
    `${getBaseUrl()}/${REST_RESOURCES.APARTMENTS}?${constructQueryParamString(
      queryParams
    )}`,
    {
      method: "GET",
      headers: getHeaders(),
    }
  )
    .then((response) => response.json())
    .then((response) => {
      throwErrorOnBadRequests(response);
      return response;
    });
}
