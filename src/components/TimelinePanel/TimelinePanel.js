import React, { useCallback, useEffect, useRef, useState } from "react";
import { fetchCountryData } from "../../api";
import groupBy from "lodash/groupBy";
import { Grid, Paper } from "@material-ui/core";
import TimelineSlider from "./TimelineSlider";
import TimelineInfoBar from "./TimelineInfoBar";
import { addDays } from "../../utils/date-utils";
import TimelineGeoChart from "./TimelineGeoChart";

const TimelinePanel = ({ countryList, timeline }) => {
  const [groups, setGroups] = useState({});
  const [currentDate, setCurrentDate] = useState("2020-02-01");
  const [currentDataset, setCurrentDataset] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    const promises = countryList.map((country) => {
      return fetchCountryData(country.code);
    });
    Promise.all(promises).then((values) => {
      const allTimelines = values.reduce((timelines, current) => {
        return [
          ...timelines,
          ...current.timeline
            .filter((t) => !t.is_in_progress)
            .map((t) => ({
              ...t,
              code: current.code,
              name: current.name,
              population: current.population,
            })),
        ];
      }, []);
      setGroups(groupBy(allTimelines, "date"));
    });
  }, [countryList]);

  const stop = useCallback(() => {
    if (intervalRef.current === null) {
      return;
    }
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setIsPlaying(false);
  }, []);

  const start = useCallback(() => {
    if (intervalRef.current !== null) {
      return;
    }

    if (!Object.keys(groups).length) {
      return;
    }
    const keys = Object.keys(groups).sort();
    const lastIso = keys.pop();

    setIsPlaying(true);
    intervalRef.current = setInterval(() => {
      setCurrentDate((d) => {
        const date = new Date(d);
        const newDate = addDays(date, 1);
        const iso = newDate.toISOString().substring(0, 10);
        if (iso === lastIso) {
          stop();
        }
        return iso;
      });
    }, 100);
  }, [groups, stop]);

  const skipPrevious = () => {
    if (intervalRef.current !== null) {
      return;
    }

    if (!Object.keys(groups).length) {
      return;
    }
    const keys = Object.keys(groups).sort();
    const firstDate = addDays(new Date(keys.shift()), 0);
    const previousDate = addDays(new Date(currentDate), -7);
    const date = firstDate > previousDate ? firstDate : previousDate;
    const iso = date.toISOString().substring(0, 10);
    setCurrentDate(iso);
  };

  const skipNext = () => {
    if (intervalRef.current !== null) {
      return;
    }

    if (!Object.keys(groups).length) {
      return;
    }
    const keys = Object.keys(groups).sort();
    const lastDate = addDays(new Date(keys.pop()), 0);
    const nextDate = addDays(new Date(currentDate), 7);
    const date = lastDate < nextDate ? lastDate : nextDate;
    const iso = date.toISOString().substring(0, 10);
    setCurrentDate(iso);
  };

  useEffect(() => {
    start();
    return () => stop();
  }, [groups, start, stop]);

  useEffect(() => {
    if (!groups[currentDate]) {
      console.log("no data:", currentDate);
      return;
    }
    const data = [
      ["Country", "Confirmed"],
      ...groups[currentDate]
        .filter((country) => country.confirmed)
        .map((country) => {
          return [
            { v: country.code, f: country.name },
            (100 * country.confirmed) / country.population,
          ];
        }),
    ];

    setCurrentDataset(data);
  }, [groups, currentDate]);

  const valueLabelFormat = (value) => {
    const date = new Date(value);
    const iso = date.toISOString().substring(0, 10);
    return iso;
  };

  const handleSliderChange = (event, newValue) => {
    const iso = valueLabelFormat(newValue);
    if (groups[iso]) {
      setCurrentDate(iso);
    }
  };

  if (!groups[currentDate]) {
    return <div></div>;
  }

  return (
    <div>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <TimelineGeoChart data={currentDataset}></TimelineGeoChart>
        </Grid>
        <Grid item xs={12}>
          <Paper>
            <TimelineInfoBar
              currentDate={currentDate}
              timeline={timeline}
              start={start}
              stop={stop}
              skipPrevious={skipPrevious}
              skipNext={skipNext}
              isPlaying={isPlaying}
            ></TimelineInfoBar>
            <TimelineSlider
              value={new Date(currentDate).valueOf()}
              min={new Date(Object.keys(groups).sort().shift()).valueOf()}
              max={new Date(Object.keys(groups).sort().pop()).valueOf()}
              handleSliderChange={handleSliderChange}
            ></TimelineSlider>
          </Paper>
        </Grid>
        <Grid item xs={12}></Grid>
      </Grid>
    </div>
  );
};

export default TimelinePanel;
