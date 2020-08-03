// React & Redux
import React, { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";

// Actions
import { getUserRequest } from "../state/user/userActions";

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

function Dashboard() {
  const classes = useStyles();
  const dispatch = useDispatch();

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
            {/* Account Setings */}
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Typography gutterBottom align="center" variant="h3">
                  Account Settings
                </Typography>
                {isEmpty(currentUser) ? (
                  <LoadingScreen fullScreen={false} message={"Loading User..."} />
                ) : (
                  <Fragment>
                    <EditUserFormDialog
                      open={openEditUserDialog}
                      close={() => setOpenEditUserDialog(false)}
                      userName={currentUserName}
                    />
                    <SubscriptionDialog
                      open={openSubscriptionDialog}
                      close={() => setOpenSubscriptionDialog(false)}
                      role={currentUser.role}
                      currentSubscription={currentUser.subscriptionID}
                      userName={currentUserName}
                    />
                    <Grid container justify="center" spacing={3} style={{ paddingBottom: "30px" }}>
                      <Grid item xs={12} sm={4} md={2}>
                        <Button
                          fullWidth
                          variant="contained"
                          color="primary"
                          onClick={() => setOpenEditUserDialog(true)}
                        >
                          EDIT
                        </Button>
                      </Grid>
                      <Grid item xs={12} sm={4} md={2}>
                        <Button fullWidth variant="contained" color="secondary">
                          DELETE
                        </Button>
                      </Grid>
                    </Grid>
                    <Divider />
                    <List>
                      <ListItem>
                        <Grid container>
                          <Grid item xs={12} sm={6}>
                            <Typography>
                              <b>Username:</b> {currentUser.userName}
                            </Typography>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <Typography>
                              <b>Role:</b> {capitalize(currentUser.role)}
                            </Typography>
                          </Grid>
                        </Grid>
                      </ListItem>
                      <ListItem>
                        <Grid container>
                          <Grid item xs={12} sm={6}>
                            <Typography>
                              <b>First Name:</b> {currentUser.firstName}
                            </Typography>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <Typography>
                              <b>Last Name:</b> {currentUser.lastName}
                            </Typography>
                          </Grid>
                        </Grid>
                      </ListItem>
                      <ListItem>
                        <Grid container>
                          <Grid item xs={12} sm={6}>
                            <Typography>
                              <b>Email:</b> {currentUser.email}
                            </Typography>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <Typography>
                              <b>Subscription:</b> {currentUser.name}
                            </Typography>
                          </Grid>
                        </Grid>
                      </ListItem>
                      <ListItem>
                        <Grid container>
                          <Grid item xs={12} sm={6}>
                            <Typography>
                              <b>Balance:</b> {parseFloat(currentUser.balance).toFixed(2)}
                            </Typography>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <Typography>
                              <b>Last Payment:</b> {currentUser.lastPayment}
                            </Typography>
                          </Grid>
                        </Grid>
                      </ListItem>
                      <ListItem>
                        <Grid container>
                          <Grid item xs={12} sm={6}>
                            <Typography>
                              <b>Currently Payment Method:</b> {currentUser.paysWithManual ? "Manual" : "Automatic"}{" "}
                              Payments
                            </Typography>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <Typography>
                              <b>Card / Account #:</b>
                            </Typography>
                          </Grid>
                        </Grid>
                      </ListItem>
                      <ListItem>
                        <Grid container justify="flex-end" spacing={3}>
                          <Grid item xs={12} sm={6} md={3}>
                            <Button fullWidth variant="outlined" onClick={() => setOpenSubscriptionDialog(true)}>
                              CHANGE SUBSCRIPTION
                            </Button>
                          </Grid>
                          <Grid item xs={12} sm={6} md={3}>
                            <Button fullWidth variant="outlined" disabled={currentUser.balance === "0.0000"}>
                              MAKE PAYMENT
                            </Button>
                          </Grid>
                        </Grid>
                      </ListItem>
                    </List>
                  </Fragment>
                )}
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
}

export default Dashboard;
