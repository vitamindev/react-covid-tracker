import React from "react";
import WorldAppBar from "./WorldAppBar";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import WorldOverviewPanel from "./WorldOverviewPanel";
import GraphPanel from "../GraphPanel/GraphPanel";
import TimelinePanel from "../TimelinePanel/TimelinePanel";

const World = ({ countryList, timeline, handleDrawerToggle }) => {
  const { path } = useRouteMatch();

  const todayTimeline = timeline[0];
  return (
    <>
      <WorldAppBar handleDrawerToggle={handleDrawerToggle} />
      <Switch>
        <Route exact path={path}>
          {todayTimeline && countryList && (
            <WorldOverviewPanel
              todayTimeline={todayTimeline}
              countries={countryList}
            ></WorldOverviewPanel>
          )}
        </Route>
        <Route exact path={`${path}/graphs`}>
          {timeline && (
            <GraphPanel
              countryList={countryList}
              todayTimeline={todayTimeline}
              timeline={timeline}
            >
              {" "}
            </GraphPanel>
          )}
        </Route>
        <Route exact path={`${path}/timeline`}>
          <TimelinePanel
            countryList={countryList}
            timeline={timeline}
          ></TimelinePanel>
        </Route>
      </Switch>
    </>
  );
};

export default World;
