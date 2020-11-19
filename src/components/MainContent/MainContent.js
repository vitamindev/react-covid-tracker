import React from "react";

import { Switch, Route } from "react-router-dom";
import Country from "../Country/Country";
import World from "../World/World";
import Home from "../Home/Home";

const MainContent = ({ countryList, timeline, handleDrawerToggle }) => {
  return (
    <Switch>
      <Route path="/country/:isoCode">
        <Country
          countryList={countryList}
          handleDrawerToggle={handleDrawerToggle}
        />
      </Route>
      <Route path="/world">
        <World
          countryList={countryList}
          timeline={timeline}
          handleDrawerToggle={handleDrawerToggle}
        />
      </Route>
      <Route exact path="/">
        <Home />
      </Route>
    </Switch>
  );
};

export default MainContent;
