import { useTheme } from "@material-ui/core";
import React from "react";
import Chart from "react-google-charts";

const WorldGeoChart = ({ countries, dimension, label, minValue, maxValue }) => {
  const theme = useTheme();

  const data = [
    ["Country", label],
    ...countries
      .filter((country) => country.latest_data.calculated[dimension])
      .map((country) => {
        return [
          { v: country.code, f: country.name },
          country.latest_data.calculated[dimension],
        ];
      }),
  ];

  return (
    <>
      <Chart
        width={"100%"}
        // height={"300px"}
        chartType="GeoChart"
        loader={<div>Loading Chart</div>}
        data={data}
        options={{
          // region: location.code, // Africa
          colorAxis: {
            minValue: minValue,
            maxValue: maxValue,
            colors: [theme.palette.success.main, theme.palette.secondary.main],
          },
          // backgroundColor: "#81d4fa",
          backgroundColor: theme.palette.grey[100],
          datalessRegionColor: theme.palette.grey[100],
          defaultColor: "#f5f5f5",
        }}
        mapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_KEY}
        // rootProps={{ "data-testid": "4" }}
      />
    </>
  );
};

export default WorldGeoChart;
