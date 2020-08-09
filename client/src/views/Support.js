// React & Redux
import React, { useState } from "react";

// Material UI
import { makeStyles } from "@material-ui/core/styles";
import { CssBaseline, Container, Divider, Grid, Paper, Typography } from "@material-ui/core";

// Components
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

function Support() {
  const classes = useStyles();

  const [open, setOpen] = useState(true);

  const currentUserRole = localStorage.get("currentUserRole");

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
                  <b>Support E-mail:</b> <a href="mailto:atotallyrealemail@customersupport.ca">atotallyrealemail@customersupport.ca</a>
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
