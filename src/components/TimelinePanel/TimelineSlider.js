import React from "react";
import { Box, Slider, withStyles } from "@material-ui/core";
import { addMonths } from "../../utils/date-utils";

const DateSlider = withStyles({
  valueLabel: {
    top: "-22px",
    "& span": {
      width: "100px",
      textAlign: "center",
      borderRadius: "4px",
      transform: "none",
    },
  },
})(Slider);

const monthLabels = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const months = Array.from(Array(24).keys()).map((i) =>
  addMonths(new Date(2020, 1, 1), i)
);

const TimelineSlider = ({ value, min, max, handleSliderChange }) => {
  const valueLabelFormat = (value) => {
    const date = new Date(value);
    const iso = date.toISOString().substring(0, 10);
    return iso;
  };

  const marks = months
    .filter((month) => month.valueOf() < max)
    .map((month) => {
      return {
        value: month.valueOf(),
        label: monthLabels[month.getMonth()],
      };
    });
  const step = 1000 * 60 * 60 * 24 * 7;
  return (
    <Box p={2}>
      <DateSlider
        value={value}
        min={min}
        max={max}
        step={step}
        marks={marks}
        onChange={handleSliderChange}
        valueLabelDisplay="off"
        valueLabelFormat={valueLabelFormat}
      ></DateSlider>
    </Box>
  );
};

export default TimelineSlider;
