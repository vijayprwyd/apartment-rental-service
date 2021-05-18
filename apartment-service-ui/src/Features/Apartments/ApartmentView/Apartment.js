import React from "react";
import { formatCurrency } from "../../../utils/currencyFormatter";
import apartmentImage from "../../../assets/noProperty.jpg";
import { UpdateApartmentOptions } from "./UpdateApartmentOptions";
export function Apartment({ apartment }) {
  const {
    name,
    floorAreaSize,
    pricePerMonth,
    noOfRooms,
    dateAdded,
    realtorEmail,
    description,
  } = apartment;

  return (
    <div className="apartment">
      <div className="aSection">
        <img alt="placeholder" src={apartmentImage} className="aImage"></img>
        <div style = {{position: "relative"}}>
          <div className="aHeader">
            <h1 style = {{marginBottom: "10px"}}>{name}</h1>
            <UpdateApartmentOptions apartment={apartment} />
          </div>

          {apartment.status === 'Availiable' && <div style = {{color: 'green'}}>Availiable</div>}
          {apartment.status === 'Rented' && <div style = {{color: 'red'}}>Rented</div>}

          <div className="aSummary">
            <div>
              {" "}
              {formatCurrency(pricePerMonth)}{" "}
              <span className="asUnit"> /month </span>{" "}
            </div>
            <div>
              {" "}
              {floorAreaSize} <span className="asUnit"> sq. ft. </span>{" "}
            </div>
            <div> {`${noOfRooms}BHK`} </div>
          </div>
          <p>{description}</p>
        </div>
      </div>
      <div className="aMetaData">
        <div>{`Posted On : ${new Date(dateAdded).toUTCString()}`}</div>
        <div>{`Realtor : ${realtorEmail}`}</div>
      </div>
    </div>
  );
}
