// React
import React, { useState } from "react";

// Material UI
import { makeStyles } from "@material-ui/core/styles";
import { CssBaseline, Container, Grid, Paper } from "@material-ui/core";

// Components
import EmployeeJobBoard from "../components/EmployeeJobBoard";
import EmployerJobBoard from "../components/EmployerJobBoard";
import AppBar from "../components/AppBar";
import SideBar from "../components/SideBar";

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
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
}));

// TODO: Render dynamically depending on user

const isEmployee = true;
const isEmployer = false;

function Dashboard() {
  const classes = useStyles();

  const [open, setOpen] = useState(true);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar open={open} setOpen={setOpen} />
      <SideBar open={open} setOpen={setOpen} />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {/* Job Board */}
            <Grid item xs={12}>
              <Paper className={classes.paper}>{isEmployee ? <EmployeeJobBoard /> : <EmployerJobBoard />}</Paper>
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
}

export default Dashboard;
