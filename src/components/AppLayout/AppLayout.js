import React from "react";

import { useTheme, makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Hidden,
  IconButton,
  Drawer,
  Typography,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import MainContent from "../MainContent/MainContent";

const drawerWidth = 250;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    [theme.breakpoints.up("md")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  drawer: {
    [theme.breakpoints.up("md")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
    [theme.breakpoints.up("md")]: {
      maxWidth: `calc(100% - ${drawerWidth}px)`,
    },
  },
}));

function AppLayout({
  drawer,
  mainContent,
  appBarTitle,
  countryList,
  timeline,
}) {
  const theme = useTheme();
  const window = undefined;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const classes = useStyles();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
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
          <Typography variant="h6" noWrap>
            {appBarTitle}
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden mdUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <MainContent
          countryList={countryList}
          timeline={timeline}
          handleDrawerToggle={handleDrawerToggle}
        ></MainContent>
      </main>
    </div>
  );
}

export default AppLayout;
export { drawerWidth };
