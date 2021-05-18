import React from "react";
import { AreaFilter } from "./AreaFilter";
import { ClearFilters } from "./ClearFilters";
import "./filters.css";
import { PriceFilter } from "./PriceFilter";
import { RoomNoFilter } from "./RoomNoFilter";
import ViewFilter from "./ViewFilter";

export function Filters() {

  return (
    <ul className="filterContainer">
      <li>
        <AreaFilter />
      </li>
      <li>
        <PriceFilter />
      </li>
      <li>
        <RoomNoFilter />{" "}
      </li>
      <li>
        <ViewFilter />
      </li>
      <ClearFilters/>
    </ul>
  );
}
