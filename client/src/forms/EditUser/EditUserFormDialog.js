// React & Redux
import React, { Fragment } from "react";
import { useDispatch } from "react-redux";

// Actions
import { putUserRequest } from "../../state/user/userActions";

// Material UI
import { Typography } from "@material-ui/core";

// Form
import { TextField, Radios } from "mui-rff";
import FormDialog from "../FormDialog";
import editUserSchema from "./EditUserFormDialog.schema";

// Util
import queryString from "query-string";

function EditUserFormDialog({ open, close, userName }) {
  const dispatch = useDispatch();

  const onSubmit = (formValues) => {
    dispatch(putUserRequest(queryString.stringify(formValues), userName));
    close();
  };

  return (
    <FormDialog
      open={open}
      close={close}
      maxWidth="md"
      title="Edit Your Account Information"
      primaryButtonLabel="Confirm"
      secondaryButtonLabel="Cancel"
      validationSchema={editUserSchema}
      onSubmit={onSubmit}
      onCancel={close}
    >
      <Fragment>
        <Typography>The following fields can be modified:</Typography>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="firstName"
          label="First Name"
          name="firstName"
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="lastName"
          label="Last Name"
          name="lastName"
        />
        <TextField variant="outlined" margin="normal" required fullWidth id="email" label="Email" name="email" />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="password"
          label="Password"
          name="password"
        />
        <Radios
          label="Payment Method"
          name="paymentMethod"
          radioGroupProps={{ row: true }}
          data={[
            { label: "Manual Payments", value: "manual" },
            { label: "Automatic Payments", value: "automatic" },
          ]}
        />
      </Fragment>
    </FormDialog>
  );
}

export default EditUserFormDialog;
