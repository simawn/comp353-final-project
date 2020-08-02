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
import PeopleOutlineIcon from "@material-ui/icons/PeopleOutline";

// export const adminMenuOptions = (
//   <Fragment>
//     <ListItem button>
//       <ListItemIcon>
//         <ListIcon />
//       </ListItemIcon>
//       <ListItemText primary="Job Listings" />
//     </ListItem>
//     <ListItem button>
//       <ListItemIcon>
//         <PeopleOutlineIcon />
//       </ListItemIcon>
//       <ListItemText primary="User List" />
//     </ListItem>
//     <ListItem button>
//       <ListItemIcon>
//         <SettingsIcon />
//       </ListItemIcon>
//       <ListItemText primary="Account Settings" />
//     </ListItem>
//     <ListItem button>
//       <ListItemIcon>
//         <LogoutIcon />
//       </ListItemIcon>
//       <ListItemText primary="Logout" />
//     </ListItem>
//   </Fragment>
// );

// export const employerMenuOptions = (
//   <Fragment>
//     <ListItem button>
//       <ListItemIcon>
//         <ListIcon />
//       </ListItemIcon>
//       <ListItemText primary="Your Listings" />
//     </ListItem>
//     <ListItem button>
//       <ListItemIcon>
//         <SettingsIcon />
//       </ListItemIcon>
//       <ListItemText primary="Account Settings" />
//     </ListItem>
//     <ListItem button>
//       <ListItemIcon>
//         <PaymentIcon />
//       </ListItemIcon>
//       <ListItemText primary="Payment Methods" />
//     </ListItem>
//     <ListItem button>
//       <ListItemIcon>
//         <LogoutIcon />
//       </ListItemIcon>
//       <ListItemText primary="Logout" />
//     </ListItem>
//   </Fragment>
// );

function EmployeeMenuOptions() {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(postLogoutRequest());
    history.push("/");
  };

  return (
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
      <ListItem onClick={handleLogout} button>
        <ListItemIcon>
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItem>
    </Fragment>
  );
}

export default EmployeeMenuOptions;
