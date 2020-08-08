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
  POST_RESET_PASSWORD_REQUEST,
  POST_RESET_PASSWORD_SUCCESS,
  POST_RESET_PASSWORD_ERROR,
  PUT_USER_REQUEST,
  PUT_USER_SUCCESS,
  PUT_USER_ERROR,
  PUT_USER_ACTIVATION_REQUEST,
  PUT_USER_ACTIVATION_SUCCESS,
  PUT_USER_ACTIVATION_ERROR,
  PUT_USER_SUBSCRIPTION_REQUEST,
  PUT_USER_SUBSCRIPTION_SUCCESS,
  PUT_USER_SUBSCRIPTION_ERROR,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_ERROR,
  GET_ALL_USERS_REQUEST,
  GET_ALL_USERS_SUCCESS,
  GET_ALL_USERS_ERROR,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_ERROR,
} from "./userActions";

const initialState = {
  currentUser: {},
  userList: [],
  snackBarInformation: {
    message: "error message",
    severity: "error",
  },
  successfulPasswordChange: false,
  errorReturned: false,
  successfulLogin: false,
  isLoading: false,
  isSubmitting: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    /* REQUESTS */
    case POST_USER_REQUEST:
    case PUT_USER_REQUEST:
    case PUT_USER_ACTIVATION_REQUEST:
    case PUT_USER_SUBSCRIPTION_REQUEST:
    case POST_RESET_PASSWORD_REQUEST:
    case DELETE_USER_REQUEST: {
      return {
        ...state,
        isSubmitting: true,
        errorReturned: false,
      };
    }
    case POST_LOGIN_REQUEST:
    case POST_LOGOUT_REQUEST: {
      return {
        ...state,
        successfulLogin: false,
        isSubmitting: true,
        errorReturned: false,
      };
    }
    case GET_USER_REQUEST:
    case GET_ALL_USERS_REQUEST: {
      return {
        ...state,
        isLoading: true,
        errorReturned: false,
      };
    }
    case POST_RESET_PASSWORD_REQUEST: {
      return {
        ...state,
        successfulPasswordChange: false,
        isSubmitting: true,
        errorReturned: false,
      };
    }

    /* SUCCESSES */
    case POST_USER_SUCCESS: {
      return {
        ...state,
        snackBarInformation: action.payload.snackBarInformation,
        isSubmitting: false,
        errorReturned: false,
      };
    }
    case POST_LOGOUT_SUCCESS: {
      return {
        ...state,
        currentUser: {},
        successfulLogin: false,
        isSubmitting: false,
        errorReturned: false,
      };
    }
    case POST_LOGIN_SUCCESS: {
      return {
        ...state,
        currentUser: action.payload.user,
        successfulLogin: true,
        isSubmitting: false,
        errorReturned: false,
      };
    }
    case GET_USER_SUCCESS: {
      return {
        ...state,
        currentUser: action.payload.user,
        errorReturned: false,
      };
    }
    case GET_ALL_USERS_SUCCESS: {
      return {
        ...state,
        userList: action.payload.userList,
        errorReturned: false,
      };
    }
    case PUT_USER_SUCCESS:
    case PUT_USER_ACTIVATION_SUCCESS:
    case PUT_USER_SUBSCRIPTION_SUCCESS:
    case DELETE_USER_SUCCESS: {
      return {
        ...state,
        isSubmitting: false,
        errorReturned: false,
      };
    }
    case POST_RESET_PASSWORD_SUCCESS: {
      return {
        ...state,
        successfulPasswordChange: true,
        isSubmitting: false,
        errorReturned: false,
      };
    }

    /* ERRORS */
    case POST_USER_ERROR: {
      return {
        ...state,
        snackBarInformation: {
          message: action.payload.error.message,
          severity: action.payload.error.severity,
        },
        isSubmitting: false,
        errorReturned: true,
      };
    }
    case POST_LOGIN_ERROR: {
      return {
        ...state,
        snackBarInformation: {
          message: action.payload.error.message,
          severity: action.payload.error.severity,
        },
        successfulLogin: false,
        isSubmitting: false,
        errorReturned: true,
      };
    }
    case POST_LOGOUT_ERROR:
    case PUT_USER_ERROR:
    case PUT_USER_ACTIVATION_ERROR:
    case PUT_USER_SUBSCRIPTION_ERROR:
    case DELETE_USER_ERROR: {
      return {
        ...state,
        snackBarInformation: {
          message: action.payload.error.message,
          severity: action.payload.error.severity,
        },
        isSubmitting: false,
        errorReturned: true,
      };
    }
    case POST_RESET_PASSWORD_ERROR: {
      return {
        ...state,
        successfulPasswordChange: false,
        snackBarInformation: {
          message: action.payload.error.message,
          severity: action.payload.error.severity,
        },
        isSubmitting: false,
        errorReturned: true,
      };
    }
    case GET_USER_ERROR:
    case GET_ALL_USERS_ERROR: {
      return {
        ...state,
        snackBarInformation: {
          message: action.payload.error.message,
          severity: action.payload.error.severity,
        },
        isLoading: false,
        errorReturned: true,
      };
    }

    default: {
      return state;
    }
  }
};

export default userReducer;
