// React & Redux
import React, { useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";

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

  const paymentMethodList = [];

  const [open, setOpen] = useState(true);
  const [openCreateCreditCardform, setOpenCreateCreditCardform] = useState(false);
  const [openCreateCheckingAccountForm, setOpenCreateCheckingAccountForm] = useState(false);

  const currentUserRole = localStorage.get("currentUserRole");
  const currentUserName = localStorage.get("currentUserName");

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
              {false ? (
                <LoadingScreen fullScreen={false} message={"Loading jobs..."} />
              ) : (
                <Paper className={classes.paper}>
                  <CreateCreditCardFormDialog
                    open={openCreateCreditCardform}
                    close={() => setOpenCreateCreditCardform(false)}
                    userName={currentUserName}
                  />
                  <CreateCheckingAccountFormDialog
                    open={openCreateCheckingAccountForm}
                    close={() => setOpenCreateCheckingAccountForm(false)}
                    userName={currentUserName}
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
                        onClick={() => setOpenCreateCreditCardform(true)}
                      >
                        ADD CREDIT CARD
                      </Button>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <Button
                        className={classes.padding}
                        fullWidth
                        variant="outlined"
                        onClick={() => setOpenCreateCheckingAccountForm(true)}
                      >
                        ADD CHECKING ACCOUNT
                      </Button>
                    </Grid>
                  </Grid>
                  {!isEmpty(paymentMethodList) ? (
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
                        {/* {jobsList.map((job, key) => ( */}
                        <TableRow>
                          <TableCell align="center">Credit</TableCell>
                          <TableCell align="center">Account Number</TableCell>
                          <TableCell align="center">123</TableCell>
                          <TableCell align="center">02/19</TableCell>
                          <TableCell align="center">Active</TableCell>
                          <TableCell align="center">
                            <IconButton onClick={() => null} className={classes.margin} size="medium">
                              <EditIcon color="primary" />
                            </IconButton>
                          </TableCell>
                          <TableCell align="center">
                            <IconButton className={classes.margin} size="medium" onClick={() => null} disabled={false}>
                              <DeleteIcon color="secondary" />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                        {/* ))} */}
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
