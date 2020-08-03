// React & Redux
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Actions
import { browsePaymentRequest, deletePaymentRequest, putPaymentRequest } from "../state/payments/paymentActions";

// Selectors
import {
  paymentMethodListSelector,
  paymentIsLoadingSelector,
  paymentIsSubmittingSelector,
} from "../state/payments/paymentSelectors";

// Material UI
import {
  CssBaseline,
  Container,
  Grid,
  Paper,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  makeStyles,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

// Components
import AppBar from "../components/AppBar";
import SideBar from "../components/SideBar";
import LoadingScreen from "../components/LoadingScreen";

// Forms
import CreateCheckingAccountFormDialog from "../forms/CreateCheckingAccount/CreateCheckingAccountFormDialog";
import CreateCreditCardFormDialog from "../forms/CreateCreditCard/CreateCreditCardFormDialog";

// Util
import localStorage from "local-storage";
import { isEmpty } from "lodash";

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
  margin: {
    margin: theme.spacing(1),
  },
  padding: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
}));

function PaymentMethods() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const paymentMethodList = useSelector(paymentMethodListSelector);
  const isLoading = useSelector(paymentIsLoadingSelector);
  const isSubmitting = useSelector(paymentIsSubmittingSelector);

  const [open, setOpen] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [currentPayment, setCurrentPayment] = useState("");
  const [currentCreditCardNumber, setCurrentCreditCardNumber] = useState("");
  const [openCreateCreditCardform, setOpenCreateCreditCardform] = useState(false);
  const [openCreateCheckingAccountForm, setOpenCreateCheckingAccountForm] = useState(false);

  const currentUserRole = localStorage.get("currentUserRole");
  const currentUserName = localStorage.get("currentUserName");

  useEffect(() => {
    dispatch(browsePaymentRequest(currentUserName));
  }, [isSubmitting]);

  console.log(paymentMethodList);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar open={open} setOpen={setOpen} />
      <SideBar role={currentUserRole} open={open} setOpen={setOpen} />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth={false} className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              {/* Payment Methods */}
              {isLoading && isEmpty(paymentMethodList) ? (
                <LoadingScreen fullScreen={false} message={"Loading payment methods..."} />
              ) : (
                <Paper className={classes.paper}>
                  <CreateCreditCardFormDialog
                    open={openCreateCreditCardform}
                    close={() => setOpenCreateCreditCardform(false)}
                    userName={currentUserName}
                    editMode={editMode}
                    currentCreditCardNumber={currentCreditCardNumber}
                  />
                  <CreateCheckingAccountFormDialog
                    open={openCreateCheckingAccountForm}
                    close={() => setOpenCreateCheckingAccountForm(false)}
                    userName={currentUserName}
                    editMode={editMode}
                    paymentID={currentPayment}
                  />
                  <Typography align="center" variant="h3">
                    Your Payment Methods
                  </Typography>
                  <Grid container justify="center" spacing={2}>
                    <Grid item xs={12} sm={6} md={3}>
                      <Button
                        className={classes.padding}
                        fullWidth
                        variant="outlined"
                        onClick={() => {
                          setEditMode(false);
                          setOpenCreateCreditCardform(true);
                        }}
                      >
                        ADD CREDIT CARD
                      </Button>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <Button
                        className={classes.padding}
                        fullWidth
                        variant="outlined"
                        onClick={() => {
                          setEditMode(false);
                          setOpenCreateCheckingAccountForm(true);
                        }}
                      >
                        ADD CHECKING ACCOUNT
                      </Button>
                    </Grid>
                  </Grid>
                  {isEmpty(paymentMethodList) ? (
                    <Typography align="center">You don't have any payment methods added yet...</Typography>
                  ) : (
                    <Table size="medium">
                      <TableHead>
                        <TableRow>
                          <TableCell align="center">Type</TableCell>
                          <TableCell align="center">Account Number</TableCell>
                          <TableCell align="center">CVV</TableCell>
                          <TableCell align="center">Expiration Date</TableCell>
                          <TableCell align="center">Status</TableCell>
                          <TableCell align="center">Edit</TableCell>
                          <TableCell align="center">Delete</TableCell>
                          <TableCell align="center">Select</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {paymentMethodList.map((paymentMethod, key) => (
                          <TableRow key={key}>
                            <TableCell align="center">
                              {paymentMethod.creditCardNumber ? "Credit Card" : "Checking Account"}
                            </TableCell>
                            <TableCell align="center">
                              {paymentMethod.creditCardNumber
                                ? paymentMethod.creditCardNumber
                                : paymentMethod.accountNumber}
                            </TableCell>
                            <TableCell align="center">
                              {paymentMethod.creditCardNumber ? paymentMethod.cvv : "-"}
                            </TableCell>
                            <TableCell align="center">
                              {paymentMethod.creditCardNumber ? paymentMethod.expirationDate : "-"}
                            </TableCell>
                            <TableCell align="center">{paymentMethod.active ? <b>SELECTED</b> : "-"}</TableCell>
                            <TableCell align="center">
                              <IconButton
                                onClick={
                                  paymentMethod.creditCardNumber
                                    ? () => {
                                        setEditMode(true);
                                        setCurrentPayment(paymentMethod.paymentID);
                                        setCurrentCreditCardNumber(paymentMethod.creditCardNumber);
                                        setOpenCreateCreditCardform(true);
                                      }
                                    : () => {
                                        setEditMode(true);
                                        setCurrentPayment(paymentMethod.paymentID);
                                        setOpenCreateCheckingAccountForm(true);
                                      }
                                }
                                className={classes.margin}
                                size="medium"
                              >
                                <EditIcon color="primary" />
                              </IconButton>
                            </TableCell>
                            <TableCell align="center">
                              <IconButton
                                className={classes.margin}
                                size="medium"
                                onClick={() => dispatch(deletePaymentRequest(paymentMethod.paymentID))}
                                disabled={false}
                              >
                                <DeleteIcon color="secondary" />
                              </IconButton>
                            </TableCell>
                            <TableCell align="center">
                              <Button
                                className={classes.margin}
                                variant="contained"
                                color="primary"
                                size="medium"
                                onClick={() =>
                                  dispatch(
                                    putPaymentRequest(
                                      { userName: currentUserName, active: true },
                                      paymentMethod.paymentID
                                    )
                                  )
                                }
                                disabled={paymentMethod.active === 1}
                              >
                                SELECT
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </Paper>
              )}
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
}

export default PaymentMethods;
