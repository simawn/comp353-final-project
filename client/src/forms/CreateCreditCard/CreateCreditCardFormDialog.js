// React & Redux
import React from "react";
import { useDispatch } from "react-redux";

// Actions
import { postPaymentRequest, putPaymentRequest } from "../../state/payments/paymentActions";

// Form
import { TextField } from "mui-rff";
import FormDialog from "../FormDialog";
import createCreditCardSchema from "./CreateCreditCardFormDialog.schema";

// Util
import queryString from "query-string";

function CreateCreditCardFormDialog({ open, close, userName, editMode = false, currentCreditCardNumber }) {
  const dispatch = useDispatch();

  const onSubmit = (formValues) => {
    editMode
      ? dispatch(putPaymentRequest(queryString.stringify(formValues), currentCreditCardNumber))
      : dispatch(postPaymentRequest(queryString.stringify(formValues), userName));
    close();
  };

  return (
    <FormDialog
      open={open}
      close={close}
      maxWidth="md"
      title={editMode ? "Edit Credit Card" : "Add Credit Card"}
      primaryButtonLabel={editMode ? "Edit Payment Method" : "Add Payment Method"}
      secondaryButtonLabel="Cancel"
      validationSchema={createCreditCardSchema}
      onSubmit={onSubmit}
      onCancel={close}
    >
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="creditCardNumber"
        label="Credit Card Number"
        name="creditCardNumber"
      />
      <TextField variant="outlined" margin="normal" required fullWidth id="cvv" label="CVV" name="cvv" />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="expirationDate"
        label="Expiration Date (MM/YY)"
        name="expirationDate"
      />
    </FormDialog>
  );
}

export default CreateCreditCardFormDialog;
