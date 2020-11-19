import React from "react";
import {
  AppBar,
  Button,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { drawerWidth } from "../AppLayout/AppLayout";
import { useHistory, useRouteMatch } from "react-router-dom";

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
  title: {
    flexGrow: 1,
  },
}));

const WorldAppBar = ({ title, handleDrawerToggle }) => {
  const classes = useStyles();
  const history = useHistory();
  const { url } = useRouteMatch();

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
          World
        </Typography>
        <Button color="inherit" onClick={() => history.push(`${url}`)}>
          Overview
        </Button>
        <Button color="inherit" onClick={() => history.push(`${url}/graphs`)}>
          Graphs
        </Button>
        <Button color="inherit" onClick={() => history.push(`${url}/timeline`)}>
          Timeline
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default WorldAppBar;
