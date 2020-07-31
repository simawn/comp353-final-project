// React / Redux
import React, { useState } from "react";

// Material UI
import { makeStyles } from "@material-ui/core/styles";
import { CssBaseline, Container, Grid, Paper } from "@material-ui/core";

// Components
import JobBoard from "../components/JobBoard";
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

function Dashboard() {
  const classes = useStyles();
  const [openDrawer, setOpenDrawer] = useState(true);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />
      <SideBar openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {/* Job Board */}
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <JobBoard />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
}

export default Dashboard;
