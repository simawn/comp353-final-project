// REQUESTS

export const POST_USER_REQUEST = "POST_USER_REQUEST";
export const postUserRequest = (userInformation, withCreds) => {
  return {
    type: POST_USER_REQUEST,
    payload: { userInformation, withCreds },
  };
};

export const POST_LOGIN_REQUEST = "POST_LOGIN_REQUEST";
export const postLoginRequest = (userInformation, withCreds) => {
  return {
    type: POST_LOGIN_REQUEST,
    payload: { userInformation, withCreds },
  };
};

export const POST_LOGOUT_REQUEST = "POST_LOGOUT_REQUEST";
export const postLogoutRequest = () => {
  return {
    type: POST_LOGOUT_REQUEST,
  };
};

export const GET_USER_REQUEST = "GET_USER_REQUEST";
export const getUserRequest = (userName) => {
  return {
    type: GET_USER_REQUEST,
    payload: { userName },
  };
};

export const PUT_USER_REQUEST = "PUT_USER_REQUEST";
export const putUserRequest = (userInformation, userName) => {
  return {
    type: PUT_USER_REQUEST,
    payload: { userInformation, userName },
  };
};

export const PUT_USER_ACTIVATION_REQUEST = "PUT_USER_ACTIVATION_REQUEST [ADMIN]";
export const putUserActivationRequest = (userName, newStatus) => {
  return {
    type: PUT_USER_ACTIVATION_REQUEST,
    payload: { userName, newStatus },
  };
};

export const PUT_USER_SUBSCRIPTION_REQUEST = "PUT_USER_SUBSCRIPTION_REQUEST";
export const putUserSubscriptionRequest = (subscriptionID, userName) => {
  return {
    type: PUT_USER_SUBSCRIPTION_REQUEST,
    payload: { subscriptionID, userName },
  };
};

export const DELETE_USER_REQUEST = "DELETE_USER_REQUEST";
export const deleteUserRequest = (userName) => {
  return {
    type: DELETE_USER_REQUEST,
    payload: { userName },
  };
};

export const GET_ALL_USERS_REQUEST = "GET_ALL_USERS_REQUEST [ADMIN]";
export const getAllUsersRequest = () => {
  return {
    type: GET_ALL_USERS_REQUEST,
  };
};

// SUCCESSES

export const POST_USER_SUCCESS = "POST_USER_SUCCESS";
export const postUserSuccess = (snackBarInformation) => {
  return {
    type: POST_USER_SUCCESS,
    payload: { snackBarInformation },
  };
};

export const POST_LOGIN_SUCCESS = "POST_LOGIN_SUCCESS";
export const postLoginSuccess = (user) => {
  return {
    type: POST_LOGIN_SUCCESS,
    payload: { user },
  };
};

export const POST_LOGOUT_SUCCESS = "POST_LOGOUT_SUCCESS";
export const postLogoutSuccess = () => {
  return {
    type: POST_LOGOUT_SUCCESS,
  };
};

export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
export const getUserSuccess = (user) => {
  return {
    type: GET_USER_SUCCESS,
    payload: { user },
  };
};

export const PUT_USER_SUCCESS = "PUT_USER_SUCCESS";
export const putUserSuccess = () => {
  return {
    type: PUT_USER_SUCCESS,
  };
};

export const PUT_USER_ACTIVATION_SUCCESS = "PUT_USER_ACTIVATION_SUCCESS [ADMIN]";
export const putUserActivationSuccess = () => {
  return {
    type: PUT_USER_ACTIVATION_SUCCESS,
  };
};

export const PUT_USER_SUBSCRIPTION_SUCCESS = "PUT_USER_SUBSCRIPTION_SUCCESS";
export const putUserSubscriptionSuccess = () => {
  return {
    type: PUT_USER_SUBSCRIPTION_SUCCESS,
  };
};

export const DELETE_USER_SUCCESS = "DELETE_USER_SUCCESS";
export const deleteUserSuccess = () => {
  return {
    type: DELETE_USER_SUCCESS,
  };
};

export const GET_ALL_USERS_SUCCESS = "GET_ALL_USERS_SUCCESS [ADMIN]";
export const getAllUsersSuccess = (userList) => {
  return {
    type: GET_ALL_USERS_SUCCESS,
    payload: { userList },
  };
};

// ERRORS

export const POST_USER_ERROR = "POST_USER_ERROR";
export const postUserError = (error) => {
  return {
    type: POST_USER_ERROR,
    payload: { error },
  };
};

export const POST_LOGIN_ERROR = "POST_LOGIN_ERROR";
export const postLoginError = (error) => {
  return {
    type: POST_LOGIN_ERROR,
    payload: { error },
  };
};

export const POST_LOGOUT_ERROR = "POST_LOGOUT_ERROR";
export const postLogoutError = (error) => {
  return {
    type: POST_LOGOUT_ERROR,
    payload: { error },
  };
};

export const GET_USER_ERROR = "GET_USER_ERROR";
export const getUserError = (error) => {
  return {
    type: GET_USER_ERROR,
    payload: { error },
  };
};

export const PUT_USER_ERROR = "PUT_USER_ERROR";
export const putUserError = (error) => {
  return {
    type: PUT_USER_SUCCESS,
    payload: { error },
  };
};

export const PUT_USER_ACTIVATION_ERROR = "PUT_USER_ACTIVATION_ERROR [ADMIN]";
export const putUserActivationError = (error) => {
  return {
    type: PUT_USER_ACTIVATION_ERROR,
    payload: { error },
  };
};

export const PUT_USER_SUBSCRIPTION_ERROR = "PUT_USER_SUBSCRIPTION_ERROR";
export const putUserSubscriptionError = (error) => {
  return {
    type: PUT_USER_SUBSCRIPTION_ERROR,
    payload: { error },
  };
};

export const DELETE_USER_ERROR = "DELETE_USER_ERROR";
export const deleteUserError = (error) => {
  return {
    type: DELETE_USER_ERROR,
    payload: { error },
  };
};

export const GET_ALL_USERS_ERROR = "GET_ALL_USERS_ERROR [ADMIN]";
export const getAllUsersError = (error) => {
  return {
    type: GET_ALL_USERS_SUCCESS,
    payload: { error },
  };
};
