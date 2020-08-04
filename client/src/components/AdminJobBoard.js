// React & Redux
import React, { useEffect, useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";

// Actions
import { browseAllJobsRequest } from "../state/jobs/jobActions";

// Selectors
import { jobsListSelector, jobListIsLoadingSelector } from "../state/jobs/jobSelectors";

// MaterialUI
import { Button, Table, TableBody, TableCell, TableHead, TableRow, Typography, makeStyles } from "@material-ui/core";

// Components
import LoadingScreen from "./LoadingScreen";
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

function AdminJobBoard() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const jobsList = useSelector(jobsListSelector);
  const isLoadingJobList = useSelector(jobListIsLoadingSelector);

  const [jobApplicantDialogOpen, setJobApplicantDialogOpen] = useState(false);
  const [selectedListing, setSelectedListing] = useState(0);

  // Check for jobsList on page load
  useEffect(() => {
    if (isEmpty(jobsList)) {
      dispatch(browseAllJobsRequest());
    }
  }, []);

  return (
    <Fragment>
      {isLoadingJobList ? (
        <LoadingScreen fullScreen={false} message={"Loading jobs..."} />
      ) : (
        <Fragment>
          <JobApplicantDialog
            open={jobApplicantDialogOpen}
            close={() => setJobApplicantDialogOpen(false)}
            jobID={selectedListing.jobID}
            isAdmin={true}
          />
          <Typography align="center" variant="h3">
            Admin Job Overview
          </Typography>
          {isEmpty(jobsList) ? (
            <Typography align="center">Loading Jobs...</Typography>
          ) : (
            <Table size="medium">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Job ID</TableCell>
                  <TableCell align="center">Employer</TableCell>
                  <TableCell align="center">Title</TableCell>
                  <TableCell align="center">Description</TableCell>
                  <TableCell align="center">Category</TableCell>
                  <TableCell align="center">Employees Needed</TableCell>
                  <TableCell align="center">Date Posted</TableCell>
                  <TableCell align="center">View Applicants</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {jobsList.map((job, key) => (
                  <TableRow key={key}>
                    <TableCell align="center">{job.jobID}</TableCell>
                    <TableCell align="center">{job.userName}</TableCell>
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

export default AdminJobBoard;
