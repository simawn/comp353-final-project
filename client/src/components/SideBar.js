// React / Redux
import React from "react";

// Material UI
import { makeStyles } from "@material-ui/core/styles";
import { Drawer, IconButton, Divider, List } from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";

// Components
import { employeeMenuOptions } from "./SideBarItems";

// Util
import clsx from "clsx";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
}));

// TODO: Render SideBar dynamically depending on what Account the User is

function SideBar({ openDrawer, setOpenDrawer }) {
  const classes = useStyles();

  return (
    <Drawer
      variant="permanent"
      classes={{
        paper: clsx(classes.drawerPaper, !openDrawer && classes.drawerPaperClose),
      }}
      openDrawer={openDrawer}
    >
      <div className={classes.toolbarIcon}>
        <IconButton onClick={() => setOpenDrawer(false)}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <List>{employeeMenuOptions}</List>
    </Drawer>
  );
}

export default SideBar;
