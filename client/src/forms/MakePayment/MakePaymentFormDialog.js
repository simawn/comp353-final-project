// React & Redux
import React from "react";
import { useDispatch } from "react-redux";

// Actions
import { putUserRequest } from "../../state/user/userActions";

// Form
import { TextField } from "mui-rff";
import FormDialog from "../FormDialog";
import makePaymentSchema from "./MakePaymentFormDialog.schema";

// Util
import queryString from "query-string";

function MakePaymentFormDialog({ open, close, userName }) {
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
      title="Make a Payment"
      primaryButtonLabel="Confirm"
      secondaryButtonLabel="Cancel"
      validationSchema={makePaymentSchema}
      onSubmit={onSubmit}
      onCancel={close}
    >
      <TextField variant="outlined" margin="normal" required fullWidth id="payment" label="Amount" name="payment" />
    </FormDialog>
  );
}

export default MakePaymentFormDialog;
