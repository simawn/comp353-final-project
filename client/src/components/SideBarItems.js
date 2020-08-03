// React / Redux
import React, { Fragment } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

// Actions
import { postLogoutRequest } from "../state/user/userActions";

// Material UI
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import ListIcon from "@material-ui/icons/List";
import LogoutIcon from "@material-ui/icons/ExitToApp";
import SettingsIcon from "@material-ui/icons/Settings";
import PaymentIcon from "@material-ui/icons/Payment";
import ContactSupportIcon from "@material-ui/icons/ContactSupport";

// Util
import localStorage from "local-storage";

function MenuOptions({ role }) {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(postLogoutRequest());
    localStorage.clear();
    history.push("/");
  };

  return (
    <Fragment>
      <ListItem
        onClick={() => {
          history.push("/jobboard");
        }}
        button
      >
        <ListItemIcon>
          <ListIcon />
        </ListItemIcon>
        <ListItemText primary={role === "employee" ? "Job Listings" : "Your Job Postings"} />
      </ListItem>
      <ListItem
        onClick={() => {
          history.push("/accountsettings");
        }}
        button
      >
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
      {role === "employer" ? (
        <ListItem onClick={() => history.push("/support")} button>
          <ListItemIcon>
            <ContactSupportIcon />
          </ListItemIcon>
          <ListItemText primary="Contact Support" />
        </ListItem>
      ) : null}
      <ListItem onClick={handleLogout} button>
        <ListItemIcon>
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItem>
    </Fragment>
  );
}

export default MenuOptions;
