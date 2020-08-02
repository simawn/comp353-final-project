// React & Redux
import React, { Fragment } from "react";
import { useDispatch } from "react-redux";

// Actions
import { postCategoryRequest } from "../state/jobs/jobActions";

// Form
import { TextField } from "mui-rff";
import FormDialog from "./FormDialog";
import createCategorySchema from "./CreateCategoryFormDialog.schema";

// Util
import queryString from "query-string";

function CreateJobFormDialog({ open, close }) {
  const dispatch = useDispatch();

  const onSubmit = (formValues) => {
    dispatch(postCategoryRequest(queryString.stringify(formValues)));
    close();
  };

  return (
    <FormDialog
      open={open}
      close={close}
      maxWidth="md"
      title="Add a Category"
      primaryButtonLabel="Add Category"
      secondaryButtonLabel="Cancel"
      validationSchema={createCategorySchema}
      onSubmit={onSubmit}
      onCancel={close}
    >
      <Fragment>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="categoryName"
          label="Category Name"
          name="categoryName"
        />
      </Fragment>
    </FormDialog>
  );
}

export default CreateJobFormDialog;
