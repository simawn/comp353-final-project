// React & Redux
import React from "react";
import { useDispatch } from "react-redux";

// Actions
import { postResetPasswordRequest } from "../../state/user/userActions";

// Form
import { TextField } from "mui-rff";
import FormDialog from "../FormDialog";
import forgotPasswordSchema from "./ForgotPasswordFormDialog.schema";

// Util
import queryString from "query-string";

function ForgotPasswordFormDialog({ open, close }) {
  const dispatch = useDispatch();

  const onSubmit = (formValues) => {
    dispatch(postResetPasswordRequest(queryString.stringify(formValues)));
    close();
  };

  return (
    <FormDialog
      open={open}
      close={close}
      maxWidth="md"
      title={"Reset password"}
      primaryButtonLabel={"Change Password"}
      secondaryButtonLabel="Cancel"
      validationSchema={forgotPasswordSchema}
      onSubmit={onSubmit}
      onCancel={close}
    >
      <TextField variant="outlined" margin="normal" required fullWidth id="userName" label="Username" name="userName" />
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
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        type="password"
        id="newPassword"
        label="New Password"
        name="newPassword"
      />
    </FormDialog>
  );
}

export default ForgotPasswordFormDialog;
