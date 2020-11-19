import { FormControl, TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import React from "react";

const CountryPicker = ({ countryList, setSelectedCountries }) => {
  const [value, setValue] = React.useState([]);
  return (
    <>
      {/* renderTags=
      {(tagValue, getTagProps) =>
        tagValue.map((option, index) => (
          <Chip
            label={option.name}
            {...getTagProps({ index })}
            disabled={option === country}
          />
        ))
      } */}
      <FormControl fullWidth>
        <Autocomplete
          multiple
          options={countryList}
          getOptionLabel={(country) => country.name}
          value={value}
          onChange={(event, newValue) => {
            setValue([...newValue]);
            setSelectedCountries([...newValue]);
          }}
          filterSelectedOptions
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              label="Select countries to compare"
              placeholder="Countries"
            />
          )}
        />
      </FormControl>
    </>
  );
};

export default CountryPicker;
