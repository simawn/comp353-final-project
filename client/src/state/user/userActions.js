export const POST_USER_REQUEST = "POST_USER_REQUEST";
export const postUserRequest = (userInformation, withCreds) => {
  return {
    type: POST_USER_REQUEST,
    payload: { userInformation, withCreds },
  };
};

export const POST_USER_SUCCESS = "POST_USER_SUCCESS";
export const postUserSuccess = (snackBarInformation) => {
  return {
    type: POST_USER_SUCCESS,
    payload: { snackBarInformation },
  };
};

export const POST_USER_ERROR = "POST_USER_ERROR";
export const postUserError = (error) => {
  return {
    type: POST_USER_ERROR,
    payload: { error },
  };
};

export const POST_LOGIN_REQUEST = "POST_LOGIN_REQUEST";
export const postLoginRequest = (userInformation, withCreds) => {
  return {
    type: POST_LOGIN_REQUEST,
    payload: { userInformation, withCreds },
  };
};

export const POST_LOGIN_SUCCESS = "POST_LOGIN_SUCCESS";
export const postLoginSuccess = (user) => {
  return {
    type: POST_LOGIN_SUCCESS,
    payload: { user },
  };
};

export const POST_LOGIN_ERROR = "POST_LOGIN_ERROR";
export const postLoginError = (error) => {
  return {
    type: POST_LOGIN_ERROR,
    payload: { error },
  };
};

export const POST_LOGOUT_REQUEST = "POST_LOGOUT_REQUEST";
export const postLogoutRequest = () => {
  return {
    type: POST_LOGOUT_REQUEST,
  };
};

export const POST_LOGOUT_SUCCESS = "POST_LOGOUT_SUCCESS";
export const postLogoutSuccess = () => {
  return {
    type: POST_LOGOUT_SUCCESS,
  };
};

export const POST_LOGOUT_ERROR = "POST_LOGOUT_ERROR";
export const postLogoutError = (error) => {
  return {
    type: POST_LOGOUT_ERROR,
    payload: { error },
  };
};
