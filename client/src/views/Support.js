// React & Redux
import React, { useState, useEffect, Fragment } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Actions
import { getUserRequest, deleteUserRequest, postLogoutRequest } from "../state/user/userActions";

// Selectors
import { currentUserSelector, userIsSubmittingSelector } from "../state/user/userSelectors";

// Material UI
import { makeStyles } from "@material-ui/core/styles";
import { CssBaseline, Container, Divider, Grid, Paper, List, ListItem, Button, Typography } from "@material-ui/core";

// Components
import AppBar from "../components/AppBar";
import SideBar from "../components/SideBar";
import LoadingScreen from "../components/LoadingScreen";
import EditUserFormDialog from "../forms/EditUser/EditUserFormDialog";
import SubscriptionDialog from "../components/SubscriptionDialog";

// Util
import localStorage from "local-storage";
import { isEmpty, capitalize } from "lodash";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    elevation: 3,
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
}));

function Support() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const currentUser = useSelector(currentUserSelector);
  const isSubmitting = useSelector(userIsSubmittingSelector);

  const [open, setOpen] = useState(true);
  const [openEditUserDialog, setOpenEditUserDialog] = useState(false);
  const [openSubscriptionDialog, setOpenSubscriptionDialog] = useState(false);

  const currentUserRole = localStorage.get("currentUserRole");
  const currentUserName = localStorage.get("currentUserName");

  useEffect(() => {
    dispatch(getUserRequest(currentUserName));
  }, [isSubmitting]);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar open={open} setOpen={setOpen} />
      <SideBar role={currentUserRole} open={open} setOpen={setOpen} />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth={false} className={classes.container}>
          <Grid container spacing={3}>
            {/* Contact Support */}
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Typography gutterBottom align="center" variant="h3">
                  Contact Support
                </Typography>
                <Divider />
                <Typography align="center" style={{ paddingTop: "30px" }}>
                  <b>Support Phone Number:</b> 1-888-123-4567
                </Typography>
                <Typography align="center" style={{ paddingTop: "30px", paddingBottom: "30px" }}>
                  <b>Support E-mail:</b> atotallyrealemail@customersupport.ca
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
}

export default Support;
