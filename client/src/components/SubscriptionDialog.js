// React & Redux
import React, { useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";

// Actions
import { putUserSubscriptionRequest } from "../state/user/userActions";

// Material UI
import {
  Typography,
  Grid,
  Paper,
  Radio,
  Dialog,
  Button,
  Divider,
  makeStyles,
  withStyles,
  IconButton,
} from "@material-ui/core";
import MuiDialogActions from "@material-ui/core/DialogActions";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import CloseIcon from "@material-ui/icons/Close";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const useStyles = makeStyles(() => ({
  padding: {
    padding: "10px",
  },
}));

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

function EditSubscriptionFormDialog({ open, close, role, currentSubscription, userName }) {
  const dispatch = useDispatch();
  const classes = useStyles();

  // MUI Radio Buttons only recognize strings
  const [selectedSubscription, setSelectedSubscription] = useState(currentSubscription.toString());

  const renderEmployeeSubscriptions = (open, close, role, currentSubscription, userName) => {
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
        <Grid align="center" item xs={4}>
          <Radio
            checked={selectedSubscription === "3"}
            onChange={(e) => setSelectedSubscription(e.target.value)}
            value={3}
          />
        </Grid>
        <Grid align="center" item xs={4}>
          <Radio
            checked={selectedSubscription === "4"}
            onChange={(e) => setSelectedSubscription(e.target.value)}
            value={4}
          />
        </Grid>
        <Grid align="center" item xs={4}>
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
              <b>100$/month</b>
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
    <Dialog maxWidth="md" fullWidth onClose={() => close()} aria-labelledby="customized-dialog-title" open={open}>
      <DialogTitle onClose={() => close()}>Select a Subscription</DialogTitle>
      <DialogContent dividers>
        {role === "employee" ? renderEmployeeSubscriptions() : renderEmployerSubscriptions()}
      </DialogContent>
      <DialogActions>
        <Grid container justify="flex-end" spacing={2}>
          <Grid item xs={3}>
            <Button fullWidth onClick={() => close()} variant="contained" color="secondary">
              CANCEL
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button
              fullWidth
              onClick={() => {
                close();
                dispatch(putUserSubscriptionRequest(selectedSubscription, userName));
              }}
              color="primary"
              variant="contained"
            >
              APPLY
            </Button>
          </Grid>
        </Grid>
      </DialogActions>
    </Dialog>
  );
}

export default EditSubscriptionFormDialog;
