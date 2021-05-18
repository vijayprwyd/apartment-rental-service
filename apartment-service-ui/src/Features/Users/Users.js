import React from "react";
import { UserProvider } from "../../Providers/UserStateProvider";
import { CUDUsers } from "./CUDUsers/CUDUsers";
import { UserUpdateSuccessNotifier } from "./CUDUsers/UserUpdateSuccessNotifier";
import { UserFeed } from "./UserFeed";

export function Users() {
  return (
    <UserProvider>
      <UserUpdateSuccessNotifier/>
      <CUDUsers />
      <UserFeed />
    </UserProvider>
  );
}
