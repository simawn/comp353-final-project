// React & Redux
import React, { useEffect, useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";

// Actions
import { getEmployerJobsRequest, browseCategoriesRequest, deleteJobRequest } from "../state/jobs/jobActions";

// Selectors
import { jobsListSelector, jobListIsLoadingSelector, jobIsSubmittingSelector } from "../state/jobs/jobSelectors";

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
  makeStyles,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

// Components
import LoadingScreen from "./LoadingScreen";
import CreateJobFormDialog from "../forms/CreateJobFormDialog";
import EditJobFormDialog from "../forms/EditJobFormDialog";
import CreateCategoryFormDialog from "../forms/CreateCategoryFormDialog";
import JobApplicantDialog from "./JobApplicantDialog";

// Util
import { isEmpty } from "lodash";

// TODO: Limit number of jobs an employer can list (based on subscription level)

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  padding: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
}));

function EmployerJobBoard({ userName }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const jobsList = useSelector(jobsListSelector);
  const isLoadingJobList = useSelector(jobListIsLoadingSelector);
  const isSubmitting = useSelector(jobIsSubmittingSelector);

  const [createJobFormOpen, setCreateJobFormOpen] = useState(false);
  const [editJobFormOpen, setEditJobFormOpen] = useState(false);
  const [createCategoryFormOpen, setCreateCategoryFormOpen] = useState(false);
  const [jobApplicantDialogOpen, setJobApplicantDialogOpen] = useState(false);
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

  console.log(selectedListing);

  return (
    <Fragment>
      {isLoadingJobList ? (
        <LoadingScreen fullScreen={false} message={"Loading jobs..."} />
      ) : (
        <Fragment>
          <CreateJobFormDialog open={createJobFormOpen} close={() => setCreateJobFormOpen(false)} userName={userName} />
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
          <Grid container justify="center" spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <Button
                className={classes.padding}
                fullWidth
                variant="outlined"
                onClick={() => setCreateJobFormOpen(true)}
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
                      >
                        <EditIcon color="primary" />
                      </IconButton>
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        className={classes.margin}
                        size="medium"
                        onClick={() => dispatch(deleteJobRequest(job.jobID))}
                        disabled={isSubmitting}
                      >
                        <DeleteIcon color="secondary" />
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
