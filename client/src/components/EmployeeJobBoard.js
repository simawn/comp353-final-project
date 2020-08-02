// React & Redux
import React, { useEffect, useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";

// Actions
import { browseJobsRequest, browseCategoriesRequest } from "../state/jobs/jobActions";
import {
  getApplicantStatusRequest,
  putApplicantStatusRequest,
  postApplicationRequest,
} from "../state/applicants/applicantActions";

// Selectors
import { jobsListSelector, jobCategoryListSelector, jobListIsLoadingSelector } from "../state/jobs/jobSelectors";
import { applicantStatusListSelector, applicantIsSubmittingSelector } from "../state/applicants/applicantSelectors";

// MaterialUI
import {
  Button,
  Grid,
  List,
  ListItem,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";

// Components
import LoadingScreen from "./LoadingScreen";

// Util
import { isEmpty, findIndex, get, capitalize } from "lodash";

// TODO: Limit number of applications an employee can make (based on subscription level)

function EmployerJobBoard({ userName }) {
  const dispatch = useDispatch();

  const [category, setCategory] = useState("Select All");

  const jobsList = useSelector(jobsListSelector);
  const categoryList = useSelector(jobCategoryListSelector);
  const applicantStatuses = useSelector(applicantStatusListSelector);
  const isLoadingJobList = useSelector(jobListIsLoadingSelector);
  const isSubmitting = useSelector(applicantIsSubmittingSelector);

  const createButton = (status, jobID) => {
    switch (status) {
      case "Not yet applied": {
        return (
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={() => dispatch(postApplicationRequest(userName, jobID))}
          >
            APPLY
          </Button>
        );
      }
      case "Pending": {
        return (
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            onClick={() => dispatch(putApplicantStatusRequest(userName, jobID, "withdrawn"))}
          >
            WITHDRAW
          </Button>
        );
      }
      default: {
        return (
          <Button fullWidth disabled variant="contained" color="primary">
            APPLY
          </Button>
        );
      }
    }
  };

  const handleChange = (event) => {
    setCategory(event.target.value || "Select All");
  };

  useEffect(() => {
    if (isEmpty(jobsList)) {
      dispatch(browseJobsRequest());
      dispatch(getApplicantStatusRequest(userName));
      dispatch(browseCategoriesRequest());
    }
  }, []);

  useEffect(() => {
    dispatch(getApplicantStatusRequest(userName));
  }, [isSubmitting]);

  return (
    <Fragment>
      {isLoadingJobList || isEmpty(jobsList) || isEmpty(categoryList) ? (
        <LoadingScreen fullScreen={false} message={"Loading jobs..."} />
      ) : (
        <Fragment>
          <Typography align="center" variant="h3">
            Job Listings
          </Typography>
          <Grid container justify="flex-start" spacing={1}>
            <Grid item xs={12} sm={12} md={4}>
              <List>
                <ListItem>
                  <Typography>Select a category to narrow your search:</Typography>
                </ListItem>
                <ListItem>
                  <Select value={category} onChange={handleChange} fullWidth>
                    {categoryList.map((category, key) => (
                      <MenuItem key={key} value={category.categoryName}>
                        {category.categoryName}
                      </MenuItem>
                    ))}
                  </Select>
                </ListItem>
              </List>
            </Grid>
          </Grid>
          <Table size="medium">
            <TableHead>
              <TableRow>
                <TableCell align="center">Job Id</TableCell>
                <TableCell align="center">Title</TableCell>
                <TableCell align="center">Description</TableCell>
                <TableCell align="center">Category</TableCell>
                <TableCell align="center">Employees Needed</TableCell>
                <TableCell align="center">Date Posted</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {jobsList.map((job, key) => {
                console.log(job);
                const index = findIndex(applicantStatuses, { jobID: job.jobID });
                const jobStatus = capitalize(get(applicantStatuses[index], `status`, "Not Yet Applied"));
                if (category === "Select All" || category === job.categoryName) {
                  return (
                    <TableRow key={key}>
                      <TableCell align="center">{job.jobID}</TableCell>
                      <TableCell align="center">{job.title}</TableCell>
                      <TableCell align="center">{job.description}</TableCell>
                      <TableCell align="center">{job.categoryName}</TableCell>
                      <TableCell align="center">{job.employeesNeeded}</TableCell>
                      <TableCell align="center">{job.datePosted}</TableCell>
                      <TableCell align="center">{jobStatus}</TableCell>
                      <TableCell>{createButton(jobStatus, job.jobID)}</TableCell>
                    </TableRow>
                  );
                }
                return null;
              })}
            </TableBody>
          </Table>
        </Fragment>
      )}
    </Fragment>
  );
}

export default EmployerJobBoard;
