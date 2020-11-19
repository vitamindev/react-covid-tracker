import React from "react";
import { FormControl, MenuItem, Select } from "@material-ui/core";

const DimensionSelect = ({ list, index, setIndex }) => {
  return (
    <>
      <FormControl fullWidth>
        <Select
          value={index}
          onChange={(event) => setIndex(event.target.value)}
        >
          {list.map((item, index) => (
            <MenuItem key={index} value={index}>
              {item.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};

export default DimensionSelect;
