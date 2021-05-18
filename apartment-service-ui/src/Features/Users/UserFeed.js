import React, { useContext, useEffect } from "react";
import "./users.css";
import { Button } from "@material-ui/core";
import { AppToolbar } from "../AppToolbar/AppToolbar";
import { UsersTable } from "./UsersTable";
import { useQuery, useQueryClient } from "react-query";
import { getUsers } from "../../services/userServices";
import { MAX_RETRY_CONFIG } from "../../services/apiConfig";
import { UserContext } from "../../Context/context";
import { PaginationNavigator } from "../../components/PaginationNavigator/PaginationNavigator";

export function UserFeed() {
  const {
    page,
    updateUserTableState,
    updateUserAction,
    latestStatus,
  } = useContext(UserContext);
  const { isLoading, error, data, isPreviousData, isStale } = useQuery(
    ["users", page],
    () => getUsers(page, 5),
    {
      staleTime: Infinity,
      keepPreviousData: true,
      retry: MAX_RETRY_CONFIG.USERS,
    }
  );

  const queryClient = useQueryClient();

  useEffect(() => {
    if (latestStatus) {
      queryClient.invalidateQueries("users");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [latestStatus]);

  function handleNextClick() {
    updateUserTableState("NAVIGATE_NEXT_PAGE");
  }

  function handlePreviousClick() {
    updateUserTableState("NAVIGATE_PREVIOUS_PAGE");
  }

  function handleAddUserClick() {
    updateUserAction("ADD_USER");
  }

  return (
    <div className="mainWidget">
      <AppToolbar />

      <div style={{ margin: "30px 20px" }}>
        <Button
          onClick={handleAddUserClick}
          variant="contained"
          color="primary"
          style={{ marginBottom: "20px" }}
        >
          Add User
        </Button>
        <UsersTable
          users={data?.data?.users}
          userResponseInfo={{
            isLoading,
            isStale,
            isPreviousData,
            error,
          }}
        />
        {!error && (
          <PaginationNavigator
            currentPage={page}
            isLastPage={!isLoading && data?.data?.users.length === 0}
            handleNextClick={handleNextClick}
            handlePreviousClick={handlePreviousClick}
          />
        )}
      </div>
    </div>
  );
}
