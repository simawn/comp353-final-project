// React / Redux
import React, { Fragment } from "react";

// Material UI
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import ListIcon from "@material-ui/icons/List";
import SettingsIcon from "@material-ui/icons/Settings";
import PaymentIcon from "@material-ui/icons/Payment";
import PeopleOutlineIcon from "@material-ui/icons/PeopleOutline";
import LogoutIcon from "@material-ui/icons/ExitToApp";

import axios from 'axios';

const handleLogout = async () => {
  try {
    await axios.post('/logout', {withCredentials: true});
    window.location.href = "/";
  } catch (error) {
    console.log("Error logging out", error);
  }
};

export const adminMenuOptions = (
  <Fragment>
    <ListItem button>
      <ListItemIcon>
        <ListIcon />
      </ListItemIcon>
      <ListItemText primary="Job Listings" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <PeopleOutlineIcon />
      </ListItemIcon>
      <ListItemText primary="User List" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <SettingsIcon />
      </ListItemIcon>
      <ListItemText primary="Account Settings" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <LogoutIcon />
      </ListItemIcon>
      <ListItemText primary="Logout" />
    </ListItem>
  </Fragment>
);

export const employerMenuOptions = (
  <Fragment>
    <ListItem button>
      <ListItemIcon>
        <ListIcon />
      </ListItemIcon>
      <ListItemText primary="Your Listings" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <SettingsIcon />
      </ListItemIcon>
      <ListItemText primary="Account Settings" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <PaymentIcon />
      </ListItemIcon>
      <ListItemText primary="Payment Methods" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <LogoutIcon />
      </ListItemIcon>
      <ListItemText primary="Logout" />
    </ListItem>
  </Fragment>
);

export const employeeMenuOptions = (
  <Fragment>
    <ListItem button>
      <ListItemIcon>
        <ListIcon />
      </ListItemIcon>
      <ListItemText primary="Job Listings" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <SettingsIcon />
      </ListItemIcon>
      <ListItemText primary="Account Settings" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <PaymentIcon />
      </ListItemIcon>
      <ListItemText primary="Payment Methods" />
    </ListItem>
    <ListItem button onClick={handleLogout}>
      <ListItemIcon>
        <LogoutIcon />
      </ListItemIcon>
      <ListItemText primary="Logout" />
    </ListItem>
  </Fragment>
);
