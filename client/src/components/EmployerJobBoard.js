// React & Redux
import React, { useEffect, useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";

// Actions
import { getEmployerJobsRequest, browseCategoriesRequest, deleteJobRequest } from "../state/jobs/jobActions";

// Selectors
import {
  jobsListSelector,
  jobListIsLoadingSelector,
  jobIsSubmittingSelector,
  jobLimitSelector,
} from "../state/jobs/jobSelectors";

// MaterialUI
import {
  Button,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Snackbar,
  makeStyles,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

// Components
import LoadingScreen from "./LoadingScreen";
import CreateJobFormDialog from "../forms/CreateJob/CreateJobFormDialog";
import EditJobFormDialog from "../forms/EditJob/EditJobFormDialog";
import CreateCategoryFormDialog from "../forms/CreateCategory/CreateCategoryFormDialog";
import JobApplicantDialog from "./JobApplicantDialog";

// Util
import { isEmpty } from "lodash";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  padding: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function EmployerJobBoard({ userName, frozen }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const jobsList = useSelector(jobsListSelector);
  const isLoadingJobList = useSelector(jobListIsLoadingSelector);
  const isSubmitting = useSelector(jobIsSubmittingSelector);
  const atJobLimit = useSelector(jobLimitSelector);

  const [createJobFormOpen, setCreateJobFormOpen] = useState(false);
  const [editJobFormOpen, setEditJobFormOpen] = useState(false);
  const [pageInitialized, setPageInitialized] = useState(false);
  const [createCategoryFormOpen, setCreateCategoryFormOpen] = useState(false);
  const [jobApplicantDialogOpen, setJobApplicantDialogOpen] = useState(false);
  const [displaySnackbar, setDisplaySnackbar] = useState(false);
  const [selectedListing, setSelectedListing] = useState(0);

  // Check for jobsList on page load
  useEffect(() => {
    if (isEmpty(jobsList)) {
      dispatch(getEmployerJobsRequest(userName));
      dispatch(browseCategoriesRequest());
    }
  }, []);

  // Check for jobsList every time user creates a new job
  useEffect(() => {
    dispatch(getEmployerJobsRequest(userName));
    dispatch(browseCategoriesRequest());
  }, [isSubmitting]);

  useEffect(() => {
    if (atJobLimit && pageInitialized) {
      setDisplaySnackbar(true);
    }
  }, [atJobLimit]);

  return (
    <Fragment>
      {isLoadingJobList ? (
        <LoadingScreen fullScreen={false} message={"Loading jobs..."} />
      ) : (
        <Fragment>
          <Snackbar
            open={displaySnackbar}
            autoHideDuration={6000}
            onClose={() => setDisplaySnackbar(false)}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <Alert onClose={() => setDisplaySnackbar(false)} severity={"error"}>
              {"You have reached your job capacity. Please either delete a job or upgrade your subscription."}
            </Alert>
          </Snackbar>
          <CreateJobFormDialog
            open={createJobFormOpen}
            close={() => setCreateJobFormOpen(false)}
            userName={userName}
            setPageInitialized={setPageInitialized}
          />
          <CreateCategoryFormDialog open={createCategoryFormOpen} close={() => setCreateCategoryFormOpen(false)} />
          <EditJobFormDialog open={editJobFormOpen} close={() => setEditJobFormOpen(false)} job={selectedListing} />
          <JobApplicantDialog
            open={jobApplicantDialogOpen}
            close={() => setJobApplicantDialogOpen(false)}
            jobID={selectedListing.jobID}
          />
          <Typography align="center" variant="h3">
            Your Job Listings
          </Typography>
          {frozen ? (
            <Typography align="center" color="secondary" gutterBottom variant="h6" style={{ paddingTop: "20px" }}>
              This account is <b>FROZEN</b>. Please make the appropriate payments to regain functionality.
            </Typography>
          ) : null}
          <Grid container justify="center" spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <Button
                className={classes.padding}
                fullWidth
                variant="outlined"
                onClick={() => setCreateJobFormOpen(true)}
                disabled={frozen}
              >
                POST A JOB
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Button
                className={classes.padding}
                fullWidth
                variant="outlined"
                onClick={() => setCreateCategoryFormOpen(true)}
                disabled={frozen}
              >
                ADD A CATEGORY
              </Button>
            </Grid>
          </Grid>
          {isEmpty(jobsList) ? (
            <Typography align="center">You don't have any job listings posted yet...</Typography>
          ) : (
            <Table size="medium">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Job ID</TableCell>
                  <TableCell align="center">Title</TableCell>
                  <TableCell align="center">Description</TableCell>
                  <TableCell align="center">Category</TableCell>
                  <TableCell align="center">Employees Needed</TableCell>
                  <TableCell align="center">Date Posted</TableCell>
                  <TableCell align="center">View Applicants</TableCell>
                  <TableCell align="center">Edit Job</TableCell>
                  <TableCell align="center">Delete Job</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {jobsList.map((job, key) => (
                  <TableRow key={key}>
                    <TableCell align="center">{job.jobID}</TableCell>
                    <TableCell align="center">{job.title}</TableCell>
                    <TableCell align="center">{job.description}</TableCell>
                    <TableCell align="center">{job.categoryName}</TableCell>
                    <TableCell align="center">{job.employeesNeeded}</TableCell>
                    <TableCell align="center">{job.datePosted}</TableCell>
                    <TableCell align="center">
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => {
                          setSelectedListing(job);
                          setJobApplicantDialogOpen(true);
                        }}
                        disabled={frozen}
                      >
                        APPLICANTS
                      </Button>
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        onClick={() => {
                          setSelectedListing(job);
                          setEditJobFormOpen(true);
                        }}
                        className={classes.margin}
                        size="medium"
                        disabled={frozen}
                      >
                        <EditIcon color={frozen ? "default" : "secondary"} />
                      </IconButton>
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        className={classes.margin}
                        size="medium"
                        onClick={() => dispatch(deleteJobRequest(job.jobID))}
                        disabled={isSubmitting || frozen}
                      >
                        <DeleteIcon color={frozen ? "default" : "secondary"} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </Fragment>
      )}
    </Fragment>
  );
}

export default EmployerJobBoard;
