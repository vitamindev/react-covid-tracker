import {
  FormControl,
  makeStyles,
  MenuItem,
  Select,
  useTheme,
} from "@material-ui/core";
import React, { useState } from "react";
import DailyTrendChart from "./DailyTrendChart";

const useStyles = makeStyles((theme) => ({
  selectTrend: {
    width: "200px",
    marginBottom: theme.spacing(2),
  },
}));

const DailyTrendCharts = ({ timeline, chartClassName }) => {
  const theme = useTheme();
  const classes = useStyles();
  const [chartIndex, setChartIndex] = useState(0);

  const charts = [
    {
      trend: "new_confirmed",
      label: "New cases",
      backgroundColor: theme.palette.warning.main,
    },
    {
      trend: "new_recovered",
      label: "Recovered cases",
      backgroundColor: theme.palette.success.main,
    },
    {
      trend: "new_deaths",
      label: "Fatal cases",
      backgroundColor: theme.palette.grey[800],
    },
  ];

  const { trend, label, backgroundColor } = charts[chartIndex];

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

      <div className={chartClassName}>
        <DailyTrendChart
          {...{ timeline, trend, label, backgroundColor }}
          displayLegend={false}
        />
      </div>
    </>
  );
};

export default DailyTrendCharts;
