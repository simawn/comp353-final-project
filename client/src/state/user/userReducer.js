import {
  POST_USER_REQUEST,
  POST_USER_SUCCESS,
  POST_USER_ERROR,
  POST_LOGIN_REQUEST,
  POST_LOGIN_SUCCESS,
  POST_LOGIN_ERROR,
  POST_LOGOUT_REQUEST,
  POST_LOGOUT_SUCCESS,
  POST_LOGOUT_ERROR,
} from "./userActions";

const initialState = {
  currentUser: {},
  snackBarInformation: {
    message: "error message",
    severity: "error",
  },
  successfulLogin: false,
  isLoading: false,
  isSubmitting: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    /* REQUESTS */
    case POST_USER_REQUEST: {
      return {
        ...state,
        isSubmitting: true,
      };
    }
    case POST_LOGIN_REQUEST:
    case POST_LOGOUT_REQUEST: {
      return {
        ...state,
        successfulLogin: false,
        isSubmitting: true,
      };
    }

    /* SUCCESSES */
    case POST_USER_SUCCESS: {
      return {
        ...state,
        snackBarInformation: action.payload.snackBarInformation,
        isSubmitting: false,
      };
    }
    case POST_LOGOUT_SUCCESS: {
      return {
        ...state,
        currentUser: {},
        successfulLogin: false,
        isSubmitting: false,
      };
    }
    case POST_LOGIN_SUCCESS: {
      return {
        ...state,
        currentUser: action.payload.user,
        successfulLogin: true,
        isSubmitting: false,
      };
    }

    /* ERRORS */
    case POST_USER_ERROR: {
      return {
        ...state,
        snackBarInformation: action.payload.error,
        isSubmitting: false,
      };
    }
    case POST_LOGIN_ERROR: {
      return {
        ...state,
        snackBarInformation: action.payload.error,
        successfulLogin: false,
        isSubmitting: false,
      };
    }
    case POST_LOGOUT_ERROR: {
      return {
        ...state,
        isSubmitting: false,
      };
    }

    default: {
      return state;
    }
  }
};

export default userReducer;
