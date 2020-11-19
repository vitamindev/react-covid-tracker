import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { fetchCountriesData, fetchTimelineData } from "./api";

import AppLayout from "./components/AppLayout/AppLayout";
import CountryPanel from "./components/SideBar/SideBar";

import { CssBaseline } from "@material-ui/core";

function App() {
  const [timeline, setTimeline] = useState([]);
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const countryData = await fetchCountriesData();
      setCountries(countryData);

      const timelineData = await fetchTimelineData();
      setTimeline(timelineData);
    };

    loadData();
  }, []);

  const todayTimeline = timeline[0];
  const drawer = todayTimeline && (
    <CountryPanel {...{ todayTimeline, countries }}></CountryPanel>
  );

  return (
    <div>
      <CssBaseline />
      <BrowserRouter>
        <AppLayout
          drawer={drawer}
          countryList={countries}
          timeline={timeline}
        />
      </BrowserRouter>
    </div>
  );
}

export default App;
