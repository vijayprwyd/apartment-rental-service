import React, { useContext, useEffect } from "react";
import {
  ApartmentFilterContext,
  DashboardContext,
} from "../../Context/context";
import { ApartmentsListView } from "./ApartmentView/ApartmentsListView";
import { ApartmentsMapView } from "./ApartmentView/ApartmentsMapView";
import { useQuery, useQueryClient } from "react-query";
import { PaginationNavigator } from "../../components/PaginationNavigator/PaginationNavigator";
import { APARTMENT_FETCH_LIMIT } from "../../constants/apiConfig";
import { getApartments } from "../../services/apartmentServices";
import Snackbar from "@material-ui/core/Snackbar";
import { MAX_RETRY_CONFIG } from "../../services/apiConfig";
import { ApartmentsErrorView } from "./ApartmentView/ApartmentsErrorView";
import { NoMoreResultAlert } from "../../components/NoMoreResults/NoMoreResultAlert";

// http://localhost:8080/api/v1/apartments?page=1&minArea=100&maxArea=8061&minPrice=0&maxPrice=384028&limit=5&apartmentTypes=2_5%2B
export function ApartmentFeed() {
  const {
    apartmentViewType,
    page,
    latestStatus,
    updateDashboardState,
  } = useContext(DashboardContext);

  const { filters } = useContext(ApartmentFilterContext);

  const queryParamObj = {
    ...filters,
    page,
    limit: APARTMENT_FETCH_LIMIT,
  };

  const { isLoading, isError, data, isPreviousData, isStale, error } = useQuery(
    ["apartments", queryParamObj],
    () => getApartments(queryParamObj),
    {
      staleTime: Infinity,
      keepPreviousData: true,
      cacheTime: 300000,
      retry: MAX_RETRY_CONFIG.APARTMENTS,
    }
  );
  const queryClient = useQueryClient();

  function handleNextClick() {
    updateDashboardState("NAVIGATE_NEXT_PAGE");
  }

  function handlePreviousClick() {
    updateDashboardState("NAVIGATE_PREVIOUS_PAGE");
  }
  useEffect(() => {
    if (latestStatus) {
      queryClient.invalidateQueries("apartments");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [latestStatus]);

  const { data: { apartments = [] } = {} } = data || {};
  const searchCompleted = !isLoading && apartments.length === 0;

  if (isError) {
    return <ApartmentsErrorView />;
  }

  return (
    <div className="apartmentContainer">
      <div className="leftDiv"></div>

      {(isLoading || isPreviousData || isStale) && (
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open
          onClose={() => updateDashboardState("APARTMENT_STATUS_UPDATE_VIEWED")}
          message="Loading ..."
        />
      )}
      {searchCompleted && <NoMoreResultAlert />}

      {apartmentViewType === "LIST_VIEW" ? (
        <ApartmentsListView apartments={apartments} />
      ) : (
        <ApartmentsMapView apartments={apartments} />
      )}
      <PaginationNavigator
        currentPage={page}
        isLastPage={searchCompleted}
        handleNextClick={handleNextClick}
        handlePreviousClick={handlePreviousClick}
      />
    </div>
  );
}
