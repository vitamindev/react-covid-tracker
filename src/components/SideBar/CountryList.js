import React, { useState, useEffect } from "react";
import {
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { FixedSizeList } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import { useDebounce } from "../../hooks";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
  },
  form: {
    padding: theme.spacing(2),
  },
  flag: {
    fontSize: theme.typography.fontSize * 3,
  },
}));

const CountryList = ({ countries }) => {
  const history = useHistory();
  const classes = useStyles();
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedCountries, setDebouncedCountries] = useState([]);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    const sortedCountries = countries.filter(
      (c) =>
        c.name.toLowerCase().indexOf(debouncedSearchTerm.toLowerCase()) > -1
    );
    setDebouncedCountries(sortedCountries);
  }, [debouncedSearchTerm, countries]);

  // ISO 3166-1 alpha-2
  // ⚠️ No support for IE 11
  function countryToFlag(isoCode) {
    return typeof String.fromCodePoint !== "undefined"
      ? isoCode
          .toUpperCase()
          .replace(/./g, (char) =>
            String.fromCodePoint(char.charCodeAt(0) + 127397)
          )
      : isoCode;
  }

  const handleSelectCountry = (country) => {
    history.push(`/country/${country.code}`);
  };

  const renderRow = ({ index, style }) => {
    const country = debouncedCountries[index];
    return (
      <ListItem
        button
        key={country.code}
        style={style}
        onClick={() => handleSelectCountry(country)}
      >
        <ListItemAvatar>
          <Typography className={classes.flag} component="span" variant="body2">
            {countryToFlag(country.code)}
          </Typography>
          {/* <Avatar alt={country.name} src={`https://www.countryflags.io/${country.code}/flat/32.png`} /> */}
        </ListItemAvatar>
        <ListItemText
          primary={country.name}
          secondary={
            <React.Fragment>
              <Typography component="span" variant="body2" color="textPrimary">
                {country.latest_data.confirmed.toLocaleString()}
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>
    );
  };

  return (
    <div className={classes.root}>
      <form className={classes.form}>
        <TextField
          label="Filter a location"
          variant="outlined"
          fullWidth={true}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        ></TextField>
      </form>

      <AutoSizer>
        {({ height, width }) => (
          <FixedSizeList
            height={height}
            width={width}
            itemSize={72}
            itemCount={debouncedCountries.length}
          >
            {renderRow}
          </FixedSizeList>
        )}
      </AutoSizer>
    </div>
  );
};

export default CountryList;
