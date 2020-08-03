// REQUESTS

export const BROWSE_PAYMENTS_REQUEST = "BROWSE_PAYMENTS_REQUEST";
export const browsePaymentRequest = (userName) => {
  return {
    type: BROWSE_PAYMENTS_REQUEST,
    payload: { userName },
  };
};

export const POST_PAYMENT_REQUEST = "POST_PAYMENT_REQUEST";
export const postPaymentRequest = (paymentInformation, userName) => {
  return {
    type: POST_PAYMENT_REQUEST,
    payload: { paymentInformation, userName },
  };
};

export const PUT_PAYMENT_REQUEST = "PUT_PAYMENT_REQUEST";
export const putPaymentRequest = (paymentInformation, userName) => {
  return {
    type: PUT_PAYMENT_REQUEST,
    payload: { paymentInformation, userName },
  };
};

export const DELETE_PAYMENT_REQUEST = "DELETE_PAYMENT_REQUEST";
export const deletePaymentRequest = (paymentID) => {
  return {
    type: DELETE_PAYMENT_REQUEST,
    payload: { paymentID },
  };
};

// SUCCESSES

export const BROWSE_PAYMENTS_SUCCESS = "BROWSE_PAYMENTS_SUCCESS";
export const browsePaymentSuccess = (paymentMethodList) => {
  return {
    type: BROWSE_PAYMENTS_SUCCESS,
    payload: { paymentMethodList },
  };
};

export const POST_PAYMENT_SUCCESS = "POST_PAYMENT_SUCCESS";
export const postPaymentSuccess = () => {
  return {
    type: POST_PAYMENT_SUCCESS,
  };
};

export const PUT_PAYMENT_SUCCESS = "PUT_PAYMENT_SUCCESS";
export const putPaymentSuccess = () => {
  return {
    type: PUT_PAYMENT_SUCCESS,
  };
};

export const DELETE_PAYMENT_SUCCESS = "DELETE_PAYMENT_SUCCESS";
export const deletePaymentSuccess = () => {
  return {
    type: DELETE_PAYMENT_SUCCESS,
  };
};

// ERRORS

export const BROWSE_PAYMENTS_ERROR = "BROWSE_PAYMENTS_ERROR";
export const browsePaymentError = (error) => {
  return {
    type: BROWSE_PAYMENTS_ERROR,
    payload: { error },
  };
};

export const POST_PAYMENT_ERROR = "POST_PAYMENT_ERROR";
export const postPaymentError = (error) => {
  return {
    type: POST_PAYMENT_ERROR,
    payload: { error },
  };
};

export const PUT_PAYMENT_ERROR = "PUT_PAYMENT_ERROR";
export const putPaymentError = (error) => {
  return {
    type: PUT_PAYMENT_ERROR,
    payload: { error },
  };
};

export const DELETE_PAYMENT_ERROR = "DELETE_PAYMENT_ERROR";
export const deletePaymentError = (error) => {
  return {
    type: DELETE_PAYMENT_ERROR,
    payload: { error },
  };
};
