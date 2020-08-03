// React & Redux
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Actions
import { putUserSubscriptionRequest } from "../../state/user/userActions";

// Material UI
import { Typography, Grid, Paper, Radio, Divider, makeStyles } from "@material-ui/core";

// Form
import FormDialog from "../FormDialog";
import editUserSchema from "./EditSubscriptionFormDialog.schema";

const useStyles = makeStyles(() => ({
  padding: {
    padding: "10px",
  },
}));

function EditSubscriptionFormDialog({ open, close, role, currentSubscription, userName }) {
  const dispatch = useDispatch();
  const classes = useStyles();

  const onSubmit = () => {
    dispatch(putUserSubscriptionRequest(selectedSubscription, userName));
    close();
  };

  // MUI Radio Buttons only recognize strings
  const [selectedSubscription, setSelectedSubscription] = useState(currentSubscription.toString());

  const renderEmployeeSubscriptions = () => {
    return (
      <Grid container justify="center" spacing={2}>
        <Grid item xs={4}>
          <Paper elevation={4}>
            <Typography align="center" variant="h3">
              Basic
            </Typography>
            <Divider />
            <Typography align="center" className={classes.padding}>
              <b>FREE</b>
            </Typography>
            <Typography align="center" className={classes.padding}>
              <b>View Jobs</b>
            </Typography>
            <Typography align="center" className={classes.padding}>
              <b>Cannot Apply to Jobs</b>
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper elevation={4}>
            <Typography align="center" variant="h3" color="primary">
              Prime
            </Typography>
            <Divider />
            <Typography align="center" className={classes.padding}>
              <b>10$/month</b>
            </Typography>
            <Typography align="center" className={classes.padding}>
              <b>View Jobs</b>
            </Typography>
            <Typography align="center" className={classes.padding}>
              <b>Apply to 5 Jobs</b>
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper elevation={4}>
            <Typography align="center" variant="h3" style={{ color: "#FFD700" }}>
              Gold
            </Typography>
            <Divider />
            <Typography align="center" className={classes.padding}>
              <b>20$/month</b>
            </Typography>
            <Typography align="center" className={classes.padding}>
              <b>View Jobs</b>
            </Typography>
            <Typography align="center" className={classes.padding}>
              <b>Apply to UNLIMITED Jobs</b>
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Radio
            checked={selectedSubscription === "3"}
            onChange={(e) => setSelectedSubscription(e.target.value)}
            value={3}
          />
        </Grid>
        <Grid item xs={4}>
          <Radio
            checked={selectedSubscription === "4"}
            onChange={(e) => setSelectedSubscription(e.target.value)}
            value={4}
          />
        </Grid>
        <Grid item xs={4}>
          <Radio
            checked={selectedSubscription === "5"}
            onChange={(e) => setSelectedSubscription(e.target.value)}
            value={5}
          />
        </Grid>
      </Grid>
    );
  };

  const renderEmployerSubscriptions = () => {
    return (
      <Grid container justify="center" spacing={2}>
        <Grid item xs={6}>
          <Paper elevation={4}>
            <Typography align="center" variant="h3" color="primary">
              Prime
            </Typography>
            <Divider />
            <Typography align="center" className={classes.padding}>
              <b>50$/month</b>
            </Typography>
            <Typography align="center" className={classes.padding}>
              <b>Hire Applicants</b>
            </Typography>
            <Typography align="center" className={classes.padding}>
              <b>Post up to 5 Jobs</b>
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper elevation={4}>
            <Typography align="center" variant="h3" style={{ color: "#FFD700" }}>
              Gold
            </Typography>
            <Divider />
            <Typography align="center" className={classes.padding}>
              <b>20$/month</b>
            </Typography>
            <Typography align="center" className={classes.padding}>
              <b>Hire Applicants</b>
            </Typography>
            <Typography align="center" className={classes.padding}>
              <b>Post UNLIMITED Jobs</b>
            </Typography>
          </Paper>
        </Grid>
        <Grid align="center" item xs={6}>
          <Radio
            checked={selectedSubscription === "1"}
            onChange={(e) => setSelectedSubscription(e.target.value)}
            value={"1"}
          />
        </Grid>
        <Grid align="center" item xs={6}>
          <Radio
            checked={selectedSubscription === "2"}
            onChange={(e) => setSelectedSubscription(e.target.value)}
            value={"2"}
          />
        </Grid>
      </Grid>
    );
  };

  return (
    <FormDialog
      open={open}
      close={close}
      maxWidth="md"
      title="Select a Subscription"
      primaryButtonLabel="Confirm"
      secondaryButtonLabel="Cancel"
      validationSchema={editUserSchema}
      onSubmit={onSubmit}
      onCancel={close}
    >
      {role === "employee" ? renderEmployeeSubscriptions() : renderEmployerSubscriptions()}
    </FormDialog>
  );
}

export default EditSubscriptionFormDialog;
