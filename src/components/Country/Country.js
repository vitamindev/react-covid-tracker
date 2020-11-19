import React, { useEffect, useReducer } from "react";
import { Switch, Route, useParams, useRouteMatch } from "react-router-dom";
import { fetchCountryData } from "../../api";
import Overview from "./CountryOverviewPanel";
import GraphPanel from "../GraphPanel/GraphPanel";
import CountryAppBar from "./CountryAppBar";
import { removeDuplicates } from "../../utils";
import NewsVideosPanel from "./NewsVideosPanel";

const initialState = {
  loading: false,
  location: null,
  timeline: [],
  todayTimeline: undefined,
};

const compareTimeline = (a, b) => {
  if (a.date === b.date) return 0;
  if (a.date < b.date) return -1;
  if (a.date > b.date) return 1;
};

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_LOCATION": {
      return { ...state, loading: true };
    }
    case "SET_LOCATION":
      const timeline = removeDuplicates(
        action.payload.timeline
          .filter((t) => !t.is_in_progress)
          .sort(compareTimeline),
        (o) => o.date
      );
      const todayTimeline = action.payload.timeline[0];

      return {
        ...state,
        loading: false,
        location: action.payload,
        timeline: timeline,
        todayTimeline,
      };
    default:
      throw new Error();
  }
}

const Country = ({ countryList, handleDrawerToggle }) => {
  const { isoCode } = useParams();
  const { path } = useRouteMatch();

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: "FETCH_LOCATION" });
    const loadData = async () => {
      const locationData = await fetchCountryData(isoCode);
      dispatch({ type: "SET_LOCATION", payload: locationData });
    };
    loadData();
  }, [isoCode]);

  const { location, timeline, todayTimeline } = state;

  return (
    <div>
      <CountryAppBar
        title={location && location.name}
        handleDrawerToggle={handleDrawerToggle}
      />
      <Switch>
        <Route exact path={path}>
          {location && (
            <Overview location={location} timeline={timeline}>
              {" "}
            </Overview>
          )}
        </Route>
        <Route exact path={`${path}/graphs`}>
          {location && (
            <GraphPanel
              countryList={countryList}
              todayTimeline={todayTimeline}
              timeline={timeline}
            ></GraphPanel>
          )}
        </Route>
        <Route exact path={`${path}/newsVideos`}>
          {location && <NewsVideosPanel country={location}></NewsVideosPanel>}
        </Route>
      </Switch>
    </div>
  );
};

export default Country;
