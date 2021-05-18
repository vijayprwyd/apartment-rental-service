import React from "react";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import IconButton from "@material-ui/core/IconButton";

export function PaginationNavigator({
  currentPage,
  handleNextClick,
  handlePreviousClick,
  isLastPage,
}) {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <IconButton
        color="primary"
        aria-label="previous"
        style={{ marginRight: "20px" }}
        disabled={currentPage === 1}
        onClick={handlePreviousClick}
      >
        <NavigateNextIcon style={{ transform: "rotate(180deg)" }} />
      </IconButton>
      <IconButton
        color="primary"
        aria-label="next"
        onClick={handleNextClick}
        disabled={isLastPage}
      >
        <NavigateNextIcon />
      </IconButton>
    </div>
  );
}
