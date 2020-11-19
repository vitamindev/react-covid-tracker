import {
  Grid,
  Card,
  CardContent,
  CardHeader,
  makeStyles,
} from "@material-ui/core";
import React from "react";
import { CumulativeChart } from "../Charts";
import DailyTrendCharts from "../Charts/DailyTrendCharts";
import CompareCountries from "../CompareCountries/CompareCountries";
import CaseInfoTiles from "./CaseInfoTIles/CaseInfoTiles";

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

const GraphPanel = ({ countryList, todayTimeline, timeline }) => {
  const classes = useStyles();
  return (
    <>
      <CaseInfoTiles todayTimeline={todayTimeline} />
      <Grid
        container
        spacing={2}
        justify="center"
        className={classes.caseInfoTiles}
      >
        <Grid item lg={6} xs={12}>
          <Card>
            <CardHeader title="Cumulative spread trends"></CardHeader>
            <CardContent>
              <div className={classes.cumulativeChartContainer}>
                <CumulativeChart timeline={timeline}></CumulativeChart>
              </div>
            </CardContent>
          </Card>
        </Grid>

        <Grid item lg={6} xs={12}>
          <Card>
            <CardHeader title="Daily spread trends"></CardHeader>
            <CardContent>
              <DailyTrendCharts
                timeline={timeline}
                chartClassName={classes.chartContainer}
              ></DailyTrendCharts>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardHeader title="Compare"></CardHeader>
            <CardContent>
              <CompareCountries
                countryList={countryList}
                chartClassName={classes.chartContainer}
              ></CompareCountries>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default GraphPanel;
