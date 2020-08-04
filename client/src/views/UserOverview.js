// React & Redux
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Actions
import { getAllUsersRequest, putUserActivationRequest } from "../state/user/userActions";

// Selectors
import { userListSelector, userIsLoadingSelector, userIsSubmittingSelector } from "../state/user/userSelectors";

// Material UI
import {
  CssBaseline,
  Container,
  Grid,
  Paper,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  makeStyles,
} from "@material-ui/core";

// Components
import AppBar from "../components/AppBar";
import SideBar from "../components/SideBar";
import LoadingScreen from "../components/LoadingScreen";

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
  margin: {
    margin: theme.spacing(1),
  },
  padding: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
}));

function UserOverview() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const isLoading = useSelector(userIsLoadingSelector);
  const isSubmitting = useSelector(userIsSubmittingSelector);
  const userList = useSelector(userListSelector);

  const [open, setOpen] = useState(true);

  const currentUserRole = localStorage.get("currentUserRole");

  useEffect(() => {
    dispatch(getAllUsersRequest());
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
            <Grid item xs={12}>
              {/* Payment Methods */}
              {isLoading && isEmpty(userList) ? (
                <LoadingScreen fullScreen={false} message={"Loading users..."} />
              ) : (
                <Paper className={classes.paper}>
                  <Typography align="center" variant="h3">
                    User Overview
                  </Typography>
                  <Table size="medium">
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">Username</TableCell>
                        <TableCell align="center">Subscription</TableCell>
                        <TableCell align="center">Email</TableCell>
                        <TableCell align="center">First Name</TableCell>
                        <TableCell align="center">Last Name</TableCell>
                        <TableCell align="center">Balance</TableCell>
                        <TableCell align="center">Active</TableCell>
                        <TableCell align="center">Last Payment</TableCell>
                        <TableCell align="center">Role</TableCell>
                        <TableCell align="center">Deactivate</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {userList.map((user, key) => {
                        const newstatus = user.active === 0 ? 1 : 0;
                        return (
                          <TableRow key={key}>
                            <TableCell align="center">{user.userName}</TableCell>
                            <TableCell align="center">{user.name}</TableCell>
                            <TableCell align="center">{user.email}</TableCell>
                            <TableCell align="center">{user.firstName}</TableCell>
                            <TableCell align="center">{user.lastName}</TableCell>
                            <TableCell align="center">
                              <Typography color={parseFloat(user.balance) < 0.0 ? "secondary" : "initial"}>
                                {parseFloat(user.balance).toFixed(2)}
                              </Typography>
                            </TableCell>
                            <TableCell align="center">{user.active ? "Active" : "Deactivated"}</TableCell>
                            <TableCell align="center">{user.lastPayment}</TableCell>
                            <TableCell align="center">{capitalize(user.role)}</TableCell>
                            <TableCell align="center">
                              <Button
                                disabled={user.role === "admin"}
                                fullWidth
                                variant="contained"
                                color={user.active === 0 ? "primary" : "secondary"}
                                onClick={() => dispatch(putUserActivationRequest(user.userName, newstatus))}
                              >
                                {user.active === 0 ? "Activate" : "Deactivate"}
                              </Button>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </Paper>
              )}
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
}

export default UserOverview;
