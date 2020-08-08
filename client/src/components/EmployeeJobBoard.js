// React & Redux
import React, { useEffect, useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";

// Actions
import { browseJobsRequest, browseCategoriesRequest, getDatedJobsRequest } from "../state/jobs/jobActions";
import {
  getApplicantStatusRequest,
  putApplicantStatusRequest,
  postApplicationRequest,
} from "../state/applicants/applicantActions";

// Selectors
import { jobsListSelector, jobCategoryListSelector, jobListIsLoadingSelector } from "../state/jobs/jobSelectors";
import {
  applicantStatusListSelector,
  applicantIsSubmittingSelector,
  applicantIsAtLimit,
} from "../state/applicants/applicantSelectors";

// MaterialUI
import {
  Snackbar,
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
import { DatePicker } from "@material-ui/pickers";
import MuiAlert from "@material-ui/lab/Alert";

// Components
import LoadingScreen from "./LoadingScreen";

// Util
import { isEmpty, findIndex, get, capitalize } from "lodash";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function EmployerJobBoard({ userName, frozen, deactivated }) {
  const dispatch = useDispatch();

  const [category, setCategory] = useState("Select All");
  const [displaySnackbar, setDisplaySnackbar] = useState(false);
  const [pageInitialized, setPageInitialized] = useState(false);
  const [startDate, handleStartDate] = useState(new Date(2020, 5, 1));
  const [endDate, handleEndDate] = useState(new Date());

  const jobsList = useSelector(jobsListSelector);
  const categoryList = useSelector(jobCategoryListSelector);
  const applicantStatuses = useSelector(applicantStatusListSelector);
  const isLoadingJobList = useSelector(jobListIsLoadingSelector);
  const isSubmitting = useSelector(applicantIsSubmittingSelector);
  const isAtLimit = useSelector(applicantIsAtLimit);

  function formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }

  const createButton = (status, jobID) => {
    switch (status) {
      case "Not yet applied": {
        return (
          <Button
            fullWidth
            variant="contained"
            color="primary"
            disabled={frozen || deactivated}
            onClick={() => {
              setPageInitialized(true);
              dispatch(postApplicationRequest(userName, jobID));
            }}
          >
            APPLY
          </Button>
        );
      }
      case "Pending":
      case "Offer": {
        return (
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            disabled={frozen || deactivated}
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

  useEffect(() => {
    if (isAtLimit && pageInitialized) {
      setDisplaySnackbar(true);
    }
  }, [isAtLimit]);

  return (
    <Fragment>
      {isLoadingJobList || isEmpty(categoryList) ? (
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
              {"You have reached the application limit. Please upgrade your subscription."}
            </Alert>
          </Snackbar>
          <Typography align="center" variant="h3">
            Job Listings
          </Typography>
          {frozen ? (
            <Typography align="center" color="secondary" gutterBottom variant="h6" style={{ paddingTop: "20px" }}>
              This account is <b>FROZEN</b>. Please make the appropriate payments to regain functionality.
            </Typography>
          ) : null}
          {deactivated ? (
            <Typography align="center" color="secondary" gutterBottom variant="h6" style={{ paddingTop: "20px" }}>
              This account is <b>DEACTIVATED</b>. You will be unable to use any of the functionality.
            </Typography>
          ) : null}
          <Grid container justify="flex-start" alignItems="center" spacing={1}>
            <Grid item xs={12} sm={12} md={6}>
              <List>
                <ListItem>
                  <Typography>
                    Select a category and <b>(optionally)</b> a date to narrow your search:
                  </Typography>
                </ListItem>
                <ListItem style={{ paddingBottom: "30px" }}>
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
            <Grid item xs={12} sm={12} md={2}>
              <DatePicker
                label="Start Date"
                value={startDate}
                onChange={handleStartDate}
                animateYearScrolling
                format="yyyy-MM-dd"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={2}>
              <DatePicker
                label="End Date"
                value={endDate}
                onChange={handleEndDate}
                animateYearScrolling
                format="yyyy-MM-dd"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={2}>
              <Button
                fullWidth
                variant="outlined"
                onClick={() => dispatch(getDatedJobsRequest(formatDate(startDate), formatDate(endDate)))}
              >
                SEARCH
              </Button>
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
              {!isEmpty(jobsList)
                ? jobsList.map((job, key) => {
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
                          <TableCell align="center">
                            {jobStatus === "Offer" ? (
                              <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                disabled={frozen || deactivated}
                                onClick={() => dispatch(putApplicantStatusRequest(userName, job.jobID, "hired"))}
                              >
                                ACCEPT
                              </Button>
                            ) : (
                              jobStatus
                            )}
                          </TableCell>
                          <TableCell>{createButton(jobStatus, job.jobID)}</TableCell>
                        </TableRow>
                      );
                    }
                    return null;
                  })
                : null}
            </TableBody>
          </Table>
        </Fragment>
      )}
    </Fragment>
  );
}

export default EmployerJobBoard;
