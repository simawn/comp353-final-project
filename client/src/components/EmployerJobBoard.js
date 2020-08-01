/* WORK IN PRGORESS */

// React
import React, { useEffect, Fragment } from "react";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { browseJobsRequest } from "../state/jobs/jobActions";
import { jobsListSelector } from "../state/jobs/jobSelectors";

// MaterialUI
import { Button, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@material-ui/core";

// Components
import LoadingScreen from "./LoadingScreen";

// Util
import { isEmpty } from "lodash";

// TODO: Take userName from state
const currentUserName = "JohnDoe";

function EmployerJobBoard() {
  const dispatch = useDispatch();

  const jobsList = useSelector(jobsListSelector);
  const isLoading = false;

  useEffect(() => {
    if (isEmpty(jobsList)) {
      dispatch(browseJobsRequest());
    }
  }, []);

  return (
    <Fragment>
      {isLoading ? (
        <LoadingScreen fullScreen={false} message={"Loading jobs..."} />
      ) : (
        <Fragment>
          <Typography align="center" variant="h3">
            Job Listings
          </Typography>
          <Table size="medium">
            <TableHead>
              <TableRow>
                <TableCell align="center">Job Id</TableCell>
                <TableCell align="center">Title</TableCell>
                <TableCell align="center">Description</TableCell>
                <TableCell align="center">Category</TableCell>
                <TableCell align="center">Employees Needed</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell></TableCell>
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
                  {/* <TableCell align="center">{job.status}</TableCell> */}
                  {/* <TableCell>
                          {row.status === "Not Yet Applied" ? (
                      <Button fullWidth variant="contained" color="primary">
                        APPLY
                      </Button>
                      ) : (
                      <Button fullWidth variant="contained" color="secondary">
                        WITHDRAW
                      </Button>
                      )}
                    </TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Fragment>
      )}
    </Fragment>
  );
}

export default EmployerJobBoard;
