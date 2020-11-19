import React from "react";
import InfoTile from "../InfoTile/InfoTile";

const CountryOverviewPanel = ({ location }) => {
  const todayTimeline = location.timeline[0];

  return (
    <>
      {todayTimeline && (
        <>
          <InfoTile todayTimeline={todayTimeline}> </InfoTile>
        </>
      )}
    </>
  );
};

export default CountryOverviewPanel;
