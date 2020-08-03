// React & Redux
import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";

// Actions
import { putJobRequest } from "../../state/jobs/jobActions";

// Selectors
import { jobCategoryListSelector } from "../../state/jobs/jobSelectors";

// Material UI
import { Grid, MenuItem } from "@material-ui/core";

// Form
import { TextField, Select } from "mui-rff";
import FormDialog from "../FormDialog";
import editJobSchema from "./EditJobFormDialog.schema";

// Util
import queryString from "query-string";

function EditJobFormDialog({ open, close, job }) {
  const dispatch = useDispatch();

  const categoryList = useSelector(jobCategoryListSelector);

  const onSubmit = (formValues) => {
    dispatch(putJobRequest(queryString.stringify(formValues), job.jobID));
    close();
  };

  return (
    <FormDialog
      open={open}
      close={close}
      maxWidth="md"
      title="Edit a Job Listing"
      primaryButtonLabel="Edit Job"
      secondaryButtonLabel="Cancel"
      validationSchema={editJobSchema}
      onSubmit={onSubmit}
      onCancel={close}
    >
      <Fragment>
        <TextField variant="outlined" margin="normal" required fullWidth id="title" label="Job Title" name="title" />
        <Grid container alignItems="center" justify="center" direction="row" spacing={1}>
          <Grid item xs={8}>
            <Select variant="outlined" required fullWidth id="category" label="Job Category" name="category">
              {categoryList.map((category, key) => {
                return category.categoryName === "Select All" ? null : (
                  <MenuItem key={key} value={category.categoryName}>
                    {category.categoryName}
                  </MenuItem>
                );
              })}
            </Select>
          </Grid>
          <Grid item xs={4}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="employeesNeeded"
              label="# of Employees"
              name="employeesNeeded"
            />
          </Grid>
        </Grid>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="jobDescription"
          label="Job Description"
          name="jobDescription"
          multiline
          rows={4}
        />
      </Fragment>
    </FormDialog>
  );
}

export default EditJobFormDialog;
