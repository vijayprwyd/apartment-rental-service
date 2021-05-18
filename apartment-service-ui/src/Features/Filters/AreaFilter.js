import React, { useContext, useState, useEffect } from "react";
import Slider from "@material-ui/core/Slider";
import { ApartmentFilterContext } from "../../Context/context";
import { makeStyles } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";
import { rangeNormalizer } from "../../utils/currencyFormatter";
import {
  MAX_APARTMENT_AREA,
  MIN_APARTMENT_AREA,
} from "../../constants/apartmentRangeConstants";

const useStyles = makeStyles(() => ({
  rangeField: {
    display: "flex",
    margin: "20px 0",
  },
  rangeInput: {
    maxWidth: "100px",
    margin: "0 0 0 5px",
  },
}));

export function AreaFilter() {
  const classes = useStyles();
  const { filters: { area = [] } = {}, updateFilters } = useContext(
    ApartmentFilterContext
  );
  const [values, setValue] = useState([area[0], area[1]]);

  function handleChange(evt, newValue) {
    setValue(newValue);
  }

  function handleTextChange(evt) {
    if (evt.target.id === "minArea")
      setValue([Number(evt.target.value), values[1]]);
    else setValue([values[0], Number(evt.target.value)]);
  }

  function updateFilterState() {
    const normalizedValue = rangeNormalizer(
      values,
      MIN_APARTMENT_AREA,
      MAX_APARTMENT_AREA
    );
    updateFilters("area", normalizedValue);
  }

  useEffect(() => {
    setValue(area);
  }, [area]);

  return (
    <div className="filterSummary">
      <div className="filterHeader">
        {` Area (sq feet) : ${values[0]} - ${values[1]}`}{" "}
      </div>
      <Slider
        value={values}
        onChange={handleChange}
        aria-labelledby="range-slider"
        onMouseUp={updateFilterState}
        min={MIN_APARTMENT_AREA}
        max={MAX_APARTMENT_AREA}
        step={100}
        style={{ maxWidth: "250px" }}
      />

      <div className={classes.rangeField}>
        <TextField
          type="number"
          variant="outlined"
          size="small"
          label="Min"
          id="minArea"
          value={values[0].toString()}
          className={classes.rangeInput}
          onChange={handleTextChange}
          onBlur={updateFilterState}
        ></TextField>
        <TextField
          type="number"
          variant="outlined"
          size="small"
          label="Max"
          id="maxArea"
          value={values[1].toString()}
          className={classes.rangeInput}
          onChange={handleTextChange}
          onBlur={updateFilterState}
        ></TextField>
      </div>
    </div>
  );
}
