import React from "react";
import { Apartment } from "./Apartment";
import "./apartments.css";

export function ApartmentsListView({ apartments }) {
  return (
    <>
      {apartments.map((apartment) => (
        <Apartment key={apartment._id} apartment = {apartment} />
      ))}
    </>
  );
}