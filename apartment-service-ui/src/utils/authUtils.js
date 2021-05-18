import { USER_ROLES } from "../constants/userRoleConstants";

export function hasUpdateUserAccess(role) {
  return role === USER_ROLES.ADMIN;
}

export function hasApartmentUpdateAccess(role) {
  return role === USER_ROLES.REALTOR || role === USER_ROLES.ADMIN;
}
