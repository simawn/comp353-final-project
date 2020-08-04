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
import GroupIcon from "@material-ui/icons/Group";
import ListAltIcon from "@material-ui/icons/ListAlt";

// Util
import localStorage from "local-storage";

function SideBarItems({ role }) {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(postLogoutRequest());
    localStorage.clear();
    history.push("/");
  };

  const renderUserOptions = () => {
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
        <ListItem onClick={() => history.push("/paymentmethods")} button>
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
  };

  const renderAdminOptions = () => {
    return (
      <Fragment>
        <ListItem
          onClick={() => {
            history.push("/jobboard");
          }}
          button
        >
          <ListItemIcon>
            <ListAltIcon />
          </ListItemIcon>
          <ListItemText primary="Job Overview" />
        </ListItem>
        <ListItem
          onClick={() => {
            history.push("/useroverview");
          }}
          button
        >
          <ListItemIcon>
            <GroupIcon />
          </ListItemIcon>
          <ListItemText primary="User Overview" />
        </ListItem>
        <ListItem onClick={handleLogout} button>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </Fragment>
    );
  };

  return <Fragment>{role === "admin" ? renderAdminOptions() : renderUserOptions()}</Fragment>;
}

export default SideBarItems;
