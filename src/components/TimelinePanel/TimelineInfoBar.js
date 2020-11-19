import {
  Box,
  Grid,
  IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core";
import {
  PauseCircleFilled,
  PlayCircleFilled,
  SkipNext,
  SkipPrevious,
} from "@material-ui/icons";
import React from "react";

const useStyles = makeStyles((theme) => ({
  iconButton: {
    padding: theme.spacing(0),
  },
  largeIcon: {
    fontSize: "3rem",
  },
}));

const TimelineInfoBar = ({
  currentDate,
  timeline,
  start,
  stop,
  skipPrevious,
  skipNext,
  isPlaying,
}) => {
  const classes = useStyles();

  const totalConfirmedCases = timeline.find((t) => t.date === currentDate)
    .confirmed;
  const fatal = timeline.find((t) => t.date === currentDate).deaths;
  return (
    <Box p={2}>
      <Grid container spacing={1} alignItems="center">
        <Grid item md={2} xs={12}>
          <Typography variant="body1">On the day of</Typography>
          <Typography variant="h5">{currentDate}</Typography>
        </Grid>
        <Grid item md={2} xs={12}>
          <Typography variant="body1">Total confirmed cases</Typography>
          <Typography variant="h5" color="secondary">
            {totalConfirmedCases.toLocaleString()}
          </Typography>
        </Grid>
        <Grid item md={6} xs={12}>
          <Typography variant="body1">Fatal</Typography>
          <Typography variant="h5">{fatal.toLocaleString()}</Typography>
        </Grid>
        <Grid item md={2} xs={12}>
          <Grid container justify="center">
            <IconButton
              color="primary"
              aria-label="skip previous"
              component="span"
              onClick={() => skipPrevious()}
              disabled={isPlaying}
              className={classes.iconButton}
            >
              <SkipPrevious fontSize="small" />
            </IconButton>
            {isPlaying ? (
              <IconButton
                color="primary"
                aria-label="pause"
                component="span"
                onClick={() => stop()}
                className={classes.iconButton}
              >
                <PauseCircleFilled className={classes.largeIcon} />
              </IconButton>
            ) : (
              <IconButton
                color="primary"
                aria-label="play"
                component="span"
                onClick={() => start()}
                className={classes.iconButton}
              >
                <PlayCircleFilled className={classes.largeIcon} />
              </IconButton>
            )}
            <IconButton
              color="primary"
              aria-label="skip next"
              component="span"
              onClick={() => skipNext()}
              disabled={isPlaying}
              className={classes.iconButton}
            >
              <SkipNext fontSize="small" />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TimelineInfoBar;
