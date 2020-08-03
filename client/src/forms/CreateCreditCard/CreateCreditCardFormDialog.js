// React & Redux
import React from "react";
import { useDispatch } from "react-redux";

// Actions
import { postPaymentRequest } from "../../state/payments/paymentActions";

// Form
import { TextField, Select } from "mui-rff";
import FormDialog from "../FormDialog";
import createCreditCardSchema from "./CreateCreditCardFormDialog.schema";

// Util
import queryString from "query-string";

function CreateCreditCardFormDialog({ open, close, userName }) {
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
      title="Add Credit Card"
      primaryButtonLabel="Add Payment Method"
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
