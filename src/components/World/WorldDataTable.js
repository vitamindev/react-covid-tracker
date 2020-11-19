import React from "react";
import { DataGrid } from "@material-ui/data-grid";

const columns = [
  { field: "id", headerName: "Country", width: 150 },
  { field: "deathRate", headerName: "Death Rate", type: "number", width: 130 },
  {
    field: "casesPerMillion",
    headerName: "Cases per million",
    type: "number",
    width: 130,
  },
  { field: "confirmed", headerName: "Total cases", type: "number", width: 130 },
  {
    field: "newConfirmed",
    headerName: "New cases",
    type: "number",
    width: 130,
  },
  { field: "deaths", headerName: "Total deaths", type: "number", width: 130 },
  {
    field: "newDeaths",
    headerName: "New deaths",
    type: "number",
    width: 130,
  },
  {
    field: "recovered",
    headerName: "Total recovered",
    type: "number",
    width: 130,
  },
];

const WorldDataTable = ({ countries }) => {
  const rows = countries.map((country) => {
    return {
      id: country.name,
      deathRate: country.latest_data.calculated.death_rate,
      casesPerMillion:
        country.latest_data.calculated.cases_per_million_population,
      confirmed: country.latest_data.confirmed,
      newConfirmed: country.today.confirmed,
      deaths: country.latest_data.deaths,
      newDeaths: country.today.deaths,
      recovered: country.latest_data.recovered,
    };
  });
  return (
    <div style={{ height: 800, width: "100%" }}>
      <DataGrid rows={rows} columns={columns} pageSize={50} />
    </div>
  );
};

export default WorldDataTable;
