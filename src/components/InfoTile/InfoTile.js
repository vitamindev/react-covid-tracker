import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography, Chip } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  bar: {
    display: "flex",
    margin: "12px 0px",
    height: "8px",
  },
  slice: {
    borderRadius: "6px",
    backgroundColor: "red",
    marginRight: "4px",
  },
  shapeCircle: {
    width: 20,
    height: 20,
    marginRight: theme.spacing(1),
    borderRadius: "50%",
  },
  active: {
    backgroundColor: theme.palette.warning.main,
  },
  recovered: {
    backgroundColor: theme.palette.success.main,
  },
  fatal: {
    backgroundColor: theme.palette.grey[800],
  },
}));

const InfoTile = ({ todayTimeline }) => {
  const classes = useStyles();
  const shapeCircleActive = (
    <div className={clsx(classes.shapeCircle, classes.active)} />
  );
  const shapeCircleRecovered = (
    <div className={clsx(classes.shapeCircle, classes.recovered)} />
  );
  const shapeCircleFatal = (
    <div className={clsx(classes.shapeCircle, classes.fatal)} />
  );

  const plusOrMinus = (numberOfCases) => {
    if (numberOfCases === 0) return 0;
    return numberOfCases > 0
      ? `+ ${numberOfCases.toLocaleString()}`
      : `- ${numberOfCases.toLocaleString()}`;
  };

  return (
    <Box display="flex" flexDirection="column">
      <Box display="flex" flexDirection="row" alignItems="center" mb={1}>
        <Box flex="1">
          <Typography variant="h4" color="secondary">
            {todayTimeline.confirmed.toLocaleString()}
          </Typography>
        </Box>
        <Chip size="small" label={plusOrMinus(todayTimeline.new_confirmed)} />
      </Box>

      <div className={classes.bar}>
        <div
          className={clsx(classes.slice, classes.active)}
          style={{
            width: `calc(${
              (todayTimeline.active / todayTimeline.confirmed) * 100
            }% - ${8}px)`,
          }}
        ></div>
        <div
          className={clsx(classes.slice, classes.recovered)}
          style={{
            width: `calc(${
              (todayTimeline.recovered / todayTimeline.confirmed) * 100
            }% - ${8}px)`,
          }}
        ></div>
        <div
          className={clsx(classes.slice, classes.fatal)}
          style={{
            width: `calc(${
              (todayTimeline.deaths / todayTimeline.confirmed) * 100
            }% - ${8}px)`,
          }}
        ></div>
      </div>

      <Box display="flex" flexDirection="row" alignItems="center" mb={1}>
        {shapeCircleActive}
        <Box flex="1">
          <Typography variant="body1" component="h6">
            Active cases
          </Typography>
        </Box>
        <Typography variant="body2" align="right">
          {todayTimeline.active.toLocaleString()}
        </Typography>
      </Box>

      <Box display="flex" flexDirection="row" alignItems="center" mb={1}>
        {shapeCircleRecovered}
        <Box flex="1">
          <Typography variant="body1" component="h6">
            Recovered cases
          </Typography>
        </Box>
        <Typography variant="body2" align="right" mr={1}>
          {todayTimeline.recovered.toLocaleString()}
        </Typography>
        <Chip
          size="small"
          label={plusOrMinus(todayTimeline.new_recovered.toLocaleString())}
        />
      </Box>

      <Box display="flex" flexDirection="row" alignItems="center" mb={1}>
        {shapeCircleFatal}
        <Box flex="1">
          <Typography variant="body1" component="h6">
            Fatal cases
          </Typography>
        </Box>
        <Typography variant="body2" align="right" mr={1}>
          {todayTimeline.deaths.toLocaleString()}
        </Typography>
        <Chip
          size="small"
          label={plusOrMinus(todayTimeline.new_deaths.toLocaleString())}
        />
      </Box>
    </Box>
  );
};

export default InfoTile;
