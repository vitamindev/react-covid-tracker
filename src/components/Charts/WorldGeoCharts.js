import { FormControl, makeStyles, MenuItem, Select } from "@material-ui/core";
import React, { useState } from "react";
import WorldGeoChart from "./WorldGeoChart";

const useStyles = makeStyles((theme) => ({
  selectTrend: {
    width: "200px",
    marginBottom: theme.spacing(2),
  },
}));

const WorldGeoCharts = ({ countries }) => {
  const classes = useStyles();
  const [chartIndex, setChartIndex] = useState(0);

  const charts = [
    {
      dimension: "death_rate",
      label: "Death rate",
      minValue: 0,
      maxValue: 10,
    },
    {
      dimension: "cases_per_million_population",
      label: "Cases per million",
      minValue: 0,
      maxValue: 20000,
    },
  ];

  const { dimension, label, minValue, maxValue } = charts[chartIndex];

  return (
    <>
      <FormControl>
        <Select
          value={chartIndex}
          className={classes.selectTrend}
          onChange={(event) => setChartIndex(event.target.value)}
        >
          {charts.map((chart, index) => (
            <MenuItem key={index} value={index}>
              {chart.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <WorldGeoChart {...{ countries, dimension, label, minValue, maxValue }} />
    </>
  );
};

export default WorldGeoCharts;
