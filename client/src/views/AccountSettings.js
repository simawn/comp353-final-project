// React & Redux
import React, { useState, useEffect, Fragment } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Actions
import { getUserRequest, deleteUserRequest, postLogoutRequest } from "../state/user/userActions";
import { browsePaymentRequest } from "../state/payments/paymentActions";

// Selectors
import { currentUserSelector, userIsSubmittingSelector } from "../state/user/userSelectors";
import { paymentMethodListSelector } from "../state/payments/paymentSelectors";

// Material UI
import { makeStyles } from "@material-ui/core/styles";
import { CssBaseline, Container, Divider, Grid, Paper, List, ListItem, Button, Typography } from "@material-ui/core";

// Components
import AppBar from "../components/AppBar";
import SideBar from "../components/SideBar";
import LoadingScreen from "../components/LoadingScreen";
import SubscriptionDialog from "../components/SubscriptionDialog";

// Forms
import EditUserFormDialog from "../forms/EditUser/EditUserFormDialog";
import MakePaymentFormDialog from "../forms/MakePayment/MakePaymentFormDialog";

// Util
import localStorage from "local-storage";
import { isEmpty, capitalize, get } from "lodash";

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
  const history = useHistory();

  const currentUser = useSelector(currentUserSelector);
  const paymentMethods = useSelector(paymentMethodListSelector);
  const isSubmitting = useSelector(userIsSubmittingSelector);

  const [open, setOpen] = useState(true);
  const [openEditUserDialog, setOpenEditUserDialog] = useState(false);
  const [openMakePaymentDialog, setOpenMakePaymentDialog] = useState(false);
  const [openSubscriptionDialog, setOpenSubscriptionDialog] = useState(false);
  const [activePaymentAccount, setActivePaymentAccount] = useState("");

  const currentUserRole = localStorage.get("currentUserRole");
  const currentUserName = localStorage.get("currentUserName");

  useEffect(() => {
    dispatch(getUserRequest(currentUserName));
    dispatch(browsePaymentRequest(currentUserName));
  }, [isSubmitting]);

  useEffect(() => {
    paymentMethods.forEach((payment) => {
      if (payment.active === 1) {
        payment.creditCardNumber
          ? setActivePaymentAccount(payment.creditCardNumber)
          : setActivePaymentAccount(payment.accountNumber);
      }
    });
  }, [paymentMethods]);

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
                {parseFloat(currentUser.balance) < 0.0 ? (
                  <Typography
                    align="center"
                    color="secondary"
                    gutterBottom
                    variant="h6"
                    style={{ paddingBottom: "20px" }}
                  >
                    This account is <b>FROZEN</b>. Please make the appropriate payments to regain functionality.
                  </Typography>
                ) : null}
                {currentUser.active === 0 ? (
                  <Typography
                    align="center"
                    color="secondary"
                    gutterBottom
                    variant="h6"
                    style={{ paddingBottom: "20px" }}
                  >
                    This account is <b>DEACTIVATED</b>. You will be unable to use any of the functionality..
                  </Typography>
                ) : null}
                {isEmpty(currentUser) ? (
                  <LoadingScreen fullScreen={false} message={"Loading User..."} />
                ) : (
                  <Fragment>
                    <EditUserFormDialog
                      open={openEditUserDialog}
                      close={() => setOpenEditUserDialog(false)}
                      userName={currentUserName}
                    />
                    <MakePaymentFormDialog
                      open={openMakePaymentDialog}
                      close={() => setOpenMakePaymentDialog(false)}
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
                        <Button
                          fullWidth
                          variant="contained"
                          color="secondary"
                          onClick={() => {
                            dispatch(postLogoutRequest());
                            dispatch(deleteUserRequest(currentUser.userName));
                            localStorage.clear();
                            history.push("/login");
                          }}
                        >
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
                            <Typography color={parseFloat(currentUser.balance) < 0.0 ? "secondary" : "initial"}>
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
                              <b>Current Payment Method:</b> {currentUser.paysWithManual ? "Manual" : "Automatic"}{" "}
                              Payments
                            </Typography>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <Typography>
                              <b>Card / Account #:</b>{" "}
                              {activePaymentAccount === "" ? "No Active Payment Method Set" : activePaymentAccount}
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
                            <Button
                              fullWidth
                              variant="outlined"
                              color={activePaymentAccount === "" ? "primary" : "secondary"}
                              disabled={parseFloat(currentUser.balance) >= 0.0 || activePaymentAccount === ""}
                              onClick={
                                activePaymentAccount === ""
                                  ? () => history.push("/paymentmethods")
                                  : () => setOpenMakePaymentDialog(true)
                              }
                            >
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
