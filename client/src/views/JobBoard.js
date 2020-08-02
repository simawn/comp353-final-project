// React & Redux
import React, { useState } from "react";

// Material UI
import { makeStyles } from "@material-ui/core/styles";
import { CssBaseline, Container, Grid, Paper } from "@material-ui/core";

// Components
import EmployeeJobBoard from "../components/EmployeeJobBoard";
import EmployerJobBoard from "../components/EmployerJobBoard";
import AppBar from "../components/AppBar";
import SideBar from "../components/SideBar";

// Util
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
  const [open, setOpen] = useState(true);

  const currentUserRole = localStorage.get("currentUserRole");
  const currentUserName = localStorage.get("currentUserName");

  const renderJobBoard = () => {
    switch (currentUserRole) {
      case "employee": {
        return <EmployeeJobBoard userName={currentUserName} />;
      }
      case "employer": {
        return <EmployerJobBoard userName={currentUserName} />;
      }
      // TODO: Implement admin board (mix of employee and employer board)
      default: {
        return null;
      }
    }
  };

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
              <Paper className={classes.paper}>{renderJobBoard()}</Paper>
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
}

export default Dashboard;
