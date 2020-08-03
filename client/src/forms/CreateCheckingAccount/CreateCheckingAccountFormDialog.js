// React & Redux
import React from "react";
import { useDispatch } from "react-redux";

// Actions
import { postPaymentRequest, putPaymentRequest } from "../../state/payments/paymentActions";

// Form
import { TextField } from "mui-rff";
import FormDialog from "../FormDialog";
import createCheckingAccountSchema from "./CreateCheckingAccountFormDialog.schema";

// Util
import queryString from "query-string";

function CreateCheckingAccountFormDialog({ open, close, userName, editMode = false, paymentID }) {
  const dispatch = useDispatch();

  const onSubmit = (formValues) => {
    editMode
      ? dispatch(putPaymentRequest(queryString.stringify(formValues), paymentID))
      : dispatch(postPaymentRequest(queryString.stringify(formValues), userName));
    close();
  };

  return (
    <FormDialog
      open={open}
      close={close}
      maxWidth="md"
      title={editMode ? "Edit Checking Account" : "Add Checking Account"}
      primaryButtonLabel={editMode ? "Edit Payment Method" : "Add Payment Method"}
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
