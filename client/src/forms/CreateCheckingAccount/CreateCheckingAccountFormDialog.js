// React & Redux
import React from "react";
import { useDispatch } from "react-redux";

// Actions
import { postPaymentRequest } from "../../state/payments/paymentActions";

// Form
import { TextField, Select } from "mui-rff";
import FormDialog from "../FormDialog";
import createCheckingAccountSchema from "./CreateCheckingAccountFormDialog.schema";

// Util
import queryString from "query-string";

function CreateCheckingAccountFormDialog({ open, close, userName }) {
  const dispatch = useDispatch();

  const onSubmit = (formValues) => {
    dispatch(postPaymentRequest(queryString.stringify(formValues), userName));
    close();
  };

  return (
    <FormDialog
      open={open}
      close={close}
      maxWidth="md"
      title="Add Checking Account"
      primaryButtonLabel="Add Payment Method"
      secondaryButtonLabel="Cancel"
      validationSchema={createCheckingAccountSchema}
      onSubmit={onSubmit}
      onCancel={close}
    >
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="accountNumber"
        label="Account Number"
        name="accountNumber"
      />
    </FormDialog>
  );
}

export default CreateCheckingAccountFormDialog;
