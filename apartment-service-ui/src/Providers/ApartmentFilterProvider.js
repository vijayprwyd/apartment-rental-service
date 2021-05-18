import { useContext, useState } from "react";
import { ApartmentFilterContext, DashboardContext } from "../Context/context";

export function ApartmentFilterProvider({ children }) {

  const { updateDashboardState } = useContext(DashboardContext);
  const [filters, setFilters] = useState({
    area: [100, 10000],
    price: [0, 500000],
    apartmentTypes: {},
  });

  function updateFilters(filter, value) {
    updateDashboardState('RESET_PAGE')
    setFilters({
      ...filters,
      [filter]: value,
    });
  }

  function clearFilters() {
    updateDashboardState('RESET_PAGE')
    setFilters({
      area: [100, 10000],
      price: [0, 500000],
      apartmentTypes: {},
    });
  }

  return (
    <ApartmentFilterContext.Provider
      value={{ filters, updateFilters, clearFilters }}
    >
      {children}
    </ApartmentFilterContext.Provider>
  );
}
