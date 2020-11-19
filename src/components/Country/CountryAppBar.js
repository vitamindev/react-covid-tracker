import React, { useState } from "react";
import {
  AppBar,
  Button,
  IconButton,
  makeStyles,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { drawerWidth } from "../AppLayout/AppLayout";
import { useHistory, useRouteMatch } from "react-router-dom";
import { Equalizer, VideoLibrary, MoreVert, Apps } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  appBar: {
    [theme.breakpoints.up("md")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  sectionLarge: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMedium: {
    display: "none",
    [theme.breakpoints.only("sm")]: {
      display: "flex",
    },
  },
  sectionExtraSmall: {
    display: "flex",
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  title: {
    flexGrow: 1,
  },
}));

const CountryAppBar = ({ title, handleDrawerToggle }) => {
  const classes = useStyles();
  const history = useHistory();
  const { url } = useRouteMatch();
  const [mobileAnchorEl, setMobileAnchorEl] = useState(null);

  const isMobileMenuOpen = Boolean(mobileAnchorEl);

  const menu = [
    {
      label: "Overview",
      url: url,
      icon: <Apps />,
    },
    {
      label: "Graphs",
      url: `${url}/graphs`,
      icon: <Equalizer />,
    },
    {
      label: "News & Videos",
      url: `${url}/newsVideos`,
      icon: <VideoLibrary />,
    },
  ];

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          className={classes.menuButton}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap className={classes.title}>
          {title}
        </Typography>
        <div className={classes.sectionLarge}>
          {menu.map((menuItem, index) => {
            return (
              <Button
                key={index}
                color="inherit"
                onClick={() => history.push(menuItem.url)}
              >
                {menuItem.label}
              </Button>
            );
          })}
        </div>

        <div className={classes.sectionMedium}>
          {menu.map((menuItem, index) => {
            return (
              <IconButton
                key={index}
                color="inherit"
                aria-label={menuItem.label}
                onClick={() => history.push(menuItem.url)}
              >
                {menuItem.icon}
              </IconButton>
            );
          })}
        </div>

        <div className={classes.sectionExtraSmall}>
          <IconButton
            aria-label="show more"
            aria-haspopup="true"
            color="inherit"
            onClick={(event) => setMobileAnchorEl(event.currentTarget)}
          >
            <MoreVert />
          </IconButton>
          <Menu
            anchorEl={mobileAnchorEl}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            keepMounted
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            open={isMobileMenuOpen}
            onClose={() => setMobileAnchorEl(null)}
          >
            {menu.map((menuItem, index) => {
              return (
                <MenuItem
                  key={index}
                  onClick={() => {
                    history.push(menuItem.url);
                    setMobileAnchorEl(null);
                  }}
                >
                  {menuItem.label}
                </MenuItem>
              );
            })}
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default CountryAppBar;
