// React & Redux
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Actions
import { getApplicantsRequest, putApplicantStatusRequest } from "../state/applicants/applicantActions";

// Selectors
import {
  applicantListSelector,
  applicantIsSubmittingSelector,
  isLoadingApplicantListSelector,
} from "../state/applicants/applicantSelectors";

// Material UI
import {
  Button,
  Dialog,
  IconButton,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  withStyles,
} from "@material-ui/core";
import MuiDialogActions from "@material-ui/core/DialogActions";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import CloseIcon from "@material-ui/icons/Close";

// Components
import LoadingScreen from "./LoadingScreen";

// Util
import { startCase, isEmpty } from "lodash";

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

function JobApplicantDialog({ open, close, jobID }) {
  const dispatch = useDispatch();

  const applicantList = useSelector(applicantListSelector);
  const isSubmitting = useSelector(applicantIsSubmittingSelector);
  const isLoading = useSelector(isLoadingApplicantListSelector);

  useEffect(() => {
    dispatch(getApplicantsRequest(jobID));
  }, [isSubmitting, jobID]);

  const renderTable = () => {
    if (isEmpty(applicantList)) {
      return <Typography align="center">No one was has applied to this job yet.</Typography>;
    } else {
      return (
        <Table size="medium">
          <TableHead>
            <TableRow>
              <TableCell align="center">First Name</TableCell>
              <TableCell align="center">Last Name</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center"></TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {applicantList.map((applicant, key) => (
              <TableRow key={key}>
                <TableCell align="center">{applicant.firstName}</TableCell>
                <TableCell align="center">{applicant.lastName}</TableCell>
                <TableCell align="center">
                  {startCase(applicant.status === "offer" ? "Offer Sent" : applicant.status)}
                </TableCell>
                <TableCell align="center">
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    disabled={["rejected", "withdrawn", "hired", "offer"].includes(applicant.status)}
                    onClick={() => dispatch(putApplicantStatusRequest(applicant.userName, applicant.jobID, "offer"))}
                  >
                    HIRE
                  </Button>
                </TableCell>
                <TableCell align="center">
                  <Button
                    fullWidth
                    variant="contained"
                    color="secondary"
                    disabled={["rejected", "withdrawn", "hired"].includes(applicant.status)}
                    onClick={() => dispatch(putApplicantStatusRequest(applicant.userName, applicant.jobID, "rejected"))}
                  >
                    REJECT
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      );
    }
  };

  return (
    <Dialog maxWidth="md" fullWidth onClose={() => close()} aria-labelledby="customized-dialog-title" open={open}>
      <DialogTitle onClose={() => close()}>Applicant List</DialogTitle>
      <DialogContent dividers>
        {isLoading ? <LoadingScreen fullScreen={false} message="Loading applicants..." /> : renderTable()}
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={() => close()} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default JobApplicantDialog;
