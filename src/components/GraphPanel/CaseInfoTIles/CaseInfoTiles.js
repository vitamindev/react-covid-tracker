import { Grid, useTheme } from "@material-ui/core";
import React from "react";
import CaseInfoTile from "./CaseInfoTile";

const CaseInfoTiles = ({ todayTimeline }) => {
  const theme = useTheme();
  return (
    <div>
      <Grid container spacing={2} justify="center">
        <Grid item lg={3} xs={12}>
          <CaseInfoTile
            label="Total confirmed cases"
            total={todayTimeline.confirmed}
            newToday={todayTimeline.new_confirmed}
            color={theme.palette.secondary.main}
          />
        </Grid>
        <Grid item lg={3} xs={12}>
          <CaseInfoTile
            label="Total active cases"
            total={todayTimeline.active}
            newToday={todayTimeline.new_confirmed}
            color={theme.palette.warning.main}
          />
        </Grid>
        <Grid item lg={3} xs={12}>
          <CaseInfoTile
            label="Total recovered cases"
            total={todayTimeline.recovered}
            newToday={todayTimeline.new_recovered}
            color={theme.palette.success.main}
          />
        </Grid>
        <Grid item lg={3} xs={12}>
          <CaseInfoTile
            label="Total fatal cases"
            total={todayTimeline.deaths}
            newToday={todayTimeline.new_deaths}
            color={theme.palette.grey[800]}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default CaseInfoTiles;
