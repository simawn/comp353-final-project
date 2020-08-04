// React & Redux
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Actions
import { getUserRequest } from "../state/user/userActions";

// Selectors
import { currentUserSelector, userIsLoadingSelector } from "../state/user/userSelectors";

// Material UI
import { makeStyles } from "@material-ui/core/styles";
import { CssBaseline, Container, Grid, Paper } from "@material-ui/core";

// Components
import EmployeeJobBoard from "../components/EmployeeJobBoard";
import EmployerJobBoard from "../components/EmployerJobBoard";
import AdminJobBoard from "../components/AdminJobBoard";
import AppBar from "../components/AppBar";
import SideBar from "../components/SideBar";
import LoadingScreen from "../components/LoadingScreen";

// Util
import { isEmpty } from "lodash";
import localStorage from "local-storage";

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

  const user = useSelector(currentUserSelector);
  const isLoading = useSelector(userIsLoadingSelector);

  const currentUserRole = localStorage.get("currentUserRole");
  const currentUserName = localStorage.get("currentUserName");

  const [open, setOpen] = useState(true);
  const [userIsFrozen, setUserIsFrozen] = useState(false);
  const [userIsDeactivated, setUserIsDeactivated] = useState(false);

  const renderJobBoard = (userIsFrozen, userIsDeactivated) => {
    switch (currentUserRole) {
      case "employee": {
        return <EmployeeJobBoard userName={currentUserName} frozen={userIsFrozen} deactivated={userIsDeactivated} />;
      }
      case "employer": {
        return <EmployerJobBoard userName={currentUserName} frozen={userIsFrozen} deactivated={userIsDeactivated} />;
      }
      case "admin": {
        return <AdminJobBoard />;
      }
      default: {
        return null;
      }
    }
  };

  useEffect(() => {
    dispatch(getUserRequest(currentUserName));
    if (user && user.balance) {
      setUserIsFrozen(parseFloat(user.balance) < 0.0);
    }
    if (user && user.active === 0) {
      setUserIsDeactivated(true);
    }
  }, [user.balance, user.active]);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar open={open} setOpen={setOpen} />
      <SideBar role={currentUserRole} open={open} setOpen={setOpen} />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth={false} className={classes.container}>
          <Grid container spacing={3}>
            {/* Job Board */}
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                {isEmpty(user) ? (
                  <LoadingScreen fullScreen={false} message={"Loading User..."} />
                ) : (
                  renderJobBoard(userIsFrozen, userIsDeactivated)
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
