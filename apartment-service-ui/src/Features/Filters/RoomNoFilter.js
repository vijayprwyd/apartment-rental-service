import React, { useContext } from "react";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { ApartmentFilterContext } from "../../Context/context";

export function RoomNoFilter() {
  const {
    filters: { apartmentTypes },
    updateFilters,
  } = useContext(ApartmentFilterContext);
  const handleChange = (event) => {
    const newRoomFilter = {
      ...apartmentTypes,
      [event.target.name]: event.target.checked,
    };
    updateFilters("apartmentTypes", newRoomFilter);
  };

  return (
    <>
      <div className="filterHeader">Apartment Type </div>

      <FormGroup row>
        {["1", "2", "3", "4", "5", "5+"].map((apartmentType) => (
          <FormControlLabel
            control={
              <Checkbox
                checked={!!apartmentTypes[apartmentType]}
                onChange={handleChange}
                name={apartmentType}
                color="primary"
              />
            }
            label={`${apartmentType}BHK`}
            key={apartmentType}
          />
        ))}
      </FormGroup>
    </>
  );
}
