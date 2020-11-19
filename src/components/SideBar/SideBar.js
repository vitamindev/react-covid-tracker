import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Divider, List } from "@material-ui/core";
import PublicIcon from "@material-ui/icons/Public";
import CountryList from "./CountryList";
import ListItemLink from "./ListItemLink";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "100vh",
  },
  top: {
    flex: "none",
  },
  scrollable: {
    flex: "1 1 auto",
    overflowY: "auto",
  },
}));

const SideBar = ({ todayTimeline, countries, handleSelectCountry }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Box display="flex" flexDirection="column" className={classes.root}>
        <List aria-label="main mailbox folders">
          <ListItemLink to="/world" primary="World" icon={<PublicIcon />} />
        </List>
        <Divider />
        <Box flex="1 1 auto" overflow="hidden">
          <CountryList {...{ countries, handleSelectCountry }}></CountryList>
        </Box>
      </Box>
    </div>
  );
};

export default SideBar;
