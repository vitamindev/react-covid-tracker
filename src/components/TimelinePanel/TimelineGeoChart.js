import { useTheme } from "@material-ui/core";
import React from "react";
import Chart from "react-google-charts";

const TimelineGeoChart = ({ data }) => {
  const theme = useTheme();
  return (
    <>
      <Chart
        width={"100%"}
        chartType="GeoChart"
        loader={<div>Loading Chart</div>}
        data={data}
        options={{
          colorAxis: {
            minValue: 0,
            maxValue: 5,
            colors: [theme.palette.success.main, theme.palette.secondary.main],
          },
          backgroundColor: theme.palette.info.light,
          datalessRegionColor: theme.palette.grey[100],
          defaultColor: "#f5f5f5",
        }}
        mapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_KEY}
      />
    </>
  );
};

export default TimelineGeoChart;
