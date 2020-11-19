import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  makeStyles,
} from "@material-ui/core";
import React from "react";
import CompareCountries from "../CompareCountries/CompareCountries";
import WorldGeoCharts from "../Charts/WorldGeoCharts";
import InfoTile from "../InfoTile/InfoTile";
import WorldDataTable from "./WorldDataTable";

const useStyles = makeStyles((theme) => ({
  caseInfoTiles: {
    marginBottom: theme.spacing(2),
  },
  cumulativeChartContainer: {
    position: "relative",
    width: "80%",
    height: "424px",
    margin: "auto",
    marginTop: theme.spacing(3),
  },
  chartContainer: {
    position: "relative",
    width: "80%",
    height: "400px",
    margin: "auto",
  },
}));

const WorldOverviewPanel = ({ todayTimeline, countries }) => {
  const classes = useStyles();
  return (
    <div>
      <Grid container spacing={2} justify="center">
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <InfoTile todayTimeline={todayTimeline}></InfoTile>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardHeader title="Statistics"></CardHeader>
            <CardContent>
              <WorldGeoCharts countries={countries}></WorldGeoCharts>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardHeader title="Countries"></CardHeader>
            <CardContent>
              <WorldDataTable countries={countries}></WorldDataTable>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardHeader title="Comparison"></CardHeader>
            <CardContent>
              <CompareCountries
                countryList={countries}
                chartClassName={classes.chartContainer}
              ></CompareCountries>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default WorldOverviewPanel;
