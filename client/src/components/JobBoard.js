// React / Redux
import React from "react";

// MaterialUI
import { Button, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@material-ui/core";

// Generate Order Data
function createData(id, jobID, title, description, category, employeesNeeded, status) {
  return { id, jobID, title, description, category, employeesNeeded, status };
}

const rows = [
  createData(
    0,
    "1",
    "Marketing Coordinator",
    "This space is reserved for the job description.",
    "Marketing",
    6,
    "Pending"
  ),
  createData(1, "2", "Medical Assistant", "This space is reserved for the job description.", "Medicine", 10, "Pending"),
  createData(
    2,
    "3",
    "Web Designer",
    "This space is reserved for the job description.",
    "Software Development",
    1,
    "Not Yet Applied"
  ),
  createData(3, "4", "Dog Trainer", "This space is reserved for the job description.", "Misc", 5, "Not Yet Applied"),
  createData(
    4,
    "5",
    "President of Sales",
    "This space is reserved for the job description.",
    "Business",
    4,
    "Not Yet Applied"
  ),
  createData(5, "6", "Nursing Assistant", "This space is reserved for the job description.", "Medicine", 2, "Pending"),
  createData(6, "7", "Project Manager", "This space is reserved for the job description.", "Business", 6, "Pending"),
  createData(7, "8", "Librarian", "This space is reserved for the job description.", "Academics", 5, "Pending"),
  createData(
    8,
    "9",
    "Project Manager",
    "GThis space is reserved for the job description.",
    "Business",
    1,
    "Not Yet Applied"
  ),
  createData(
    9,
    "10",
    "Account Executive",
    "This space is reserved for the job description.",
    "Business",
    2,
    "Not Yet Applied"
  ),
];

// TODO: Use real data instead of mock
// TODO: Allow user to sort by category

export default function Orders() {
  return (
    <React.Fragment>
      <Typography align="center" variant="h3">
        Job Listings
      </Typography>
      <Table size="large">
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
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell align="center">{row.jobID}</TableCell>
              <TableCell align="center">{row.title}</TableCell>
              <TableCell align="center">{row.description}</TableCell>
              <TableCell align="center">{row.category}</TableCell>
              <TableCell align="center">{row.employeesNeeded}</TableCell>
              <TableCell align="center">{row.status}</TableCell>
              <TableCell>
                {row.status === "Not Yet Applied" ? (
                  <Button fullWidth variant="contained" color="primary">
                    APPLY
                  </Button>
                ) : (
                  <Button fullWidth variant="contained" color="secondary">
                    WITHDRAW
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
