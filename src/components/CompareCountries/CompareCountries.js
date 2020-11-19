import { Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { fetchCountryData } from "../../api";
import CompareCountryChart from "./CompareCountryChart";
import DimensionSelect from "./DimensionSelect";
import CountryPicker from "./CountryPicker";

const CompareCountries = ({ countryList, chartClassName }) => {
  const [dimensionIndex, setDimensionIndex] = useState(0);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      const result = [];
      for (const c of selectedCountries) {
        const country = await fetchCountryData(c.code);
        result.push(country);
      }
      setCountries(result);
    };

    fetchCountries();
  }, [countryList, selectedCountries]);

  const dimensions = [
    {
      dimension: "confirmed",
      label: "Confirmed cases",
    },
    {
      dimension: "active",
      label: "Active cases",
    },
    {
      dimension: "recovered",
      label: "Recovered cases",
    },
    {
      dimension: "deaths",
      label: "Fatal cases",
    },
  ];

  return (
    <>
      <Grid container spacing={1} alignItems="center">
        <Grid item xs={12} lg={3}>
          <DimensionSelect
            list={dimensions}
            index={dimensionIndex}
            setIndex={setDimensionIndex}
          />
        </Grid>
        <Grid item xs={12} lg={9}>
          <CountryPicker
            countryList={countryList}
            setSelectedCountries={setSelectedCountries}
          ></CountryPicker>
        </Grid>
      </Grid>

      <div className={chartClassName}>
        <CompareCountryChart
          countries={countries}
          dimension={dimensions[dimensionIndex].dimension}
        />
      </div>
    </>
  );
};

export default CompareCountries;
