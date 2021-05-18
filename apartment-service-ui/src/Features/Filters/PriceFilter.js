import React, { useState, useContext, useEffect } from "react";
import Slider from "@material-ui/core/Slider";
import { ApartmentFilterContext } from "../../Context/context";
import { TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  MAX_APARTMENT_PRICE,
  MIN_APARTMENT_PRICE,
} from "../../constants/apartmentRangeConstants";
import { rangeNormalizer } from "../../utils/currencyFormatter";

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

export function PriceFilter() {
  const { filters: { price = [] } = {}, updateFilters } = useContext(
    ApartmentFilterContext
  );
  const classes = useStyles();

  const [values, setValue] = useState([price[0], price[1]]);

  function handleChange(evt, newValue) {
    setValue(newValue);
  }

  function handleTextChange(evt) {
    if (evt.target.id === "minPrice")
      setValue([Number(evt.target.value), values[1]]);
    else setValue([values[0], Number(evt.target.value)]);
  }

  function updateFilterState() {
    const normalizedValue = rangeNormalizer(
      values,
      MIN_APARTMENT_PRICE,
      MAX_APARTMENT_PRICE
    );
    updateFilters("price", normalizedValue);
  }

  useEffect(() => {
    setValue(price);
  }, [price]);

  return (
    <div className="filterSummary">
      <div className="filterHeader">
        {`Price ( Rs ) ${values[0]} - ${values[1]} `}{" "}
      </div>
      <Slider
        value={values}
        onChange={handleChange}
        onMouseUp={updateFilterState}
        aria-labelledby="range-slider"
        min={MIN_APARTMENT_PRICE}
        step={1000}
        max={MAX_APARTMENT_PRICE}
        style={{ maxWidth: "250px" }}
      />
      <div className={classes.rangeField}>
        <TextField
          type="number"
          variant="outlined"
          size="small"
          label="Min"
          id="minPrice"
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
          id="maxPrice"
          value={values[1].toString()}
          className={classes.rangeInput}
          onChange={handleTextChange}
          onBlur={updateFilterState}
        ></TextField>
      </div>
    </div>
  );
}
