import {
  BROWSE_PAYMENTS_REQUEST,
  BROWSE_PAYMENTS_SUCCESS,
  BROWSE_PAYMENTS_ERROR,
  POST_PAYMENT_REQUEST,
  POST_PAYMENT_SUCCESS,
  POST_PAYMENT_ERROR,
  PUT_PAYMENT_REQUEST,
  PUT_PAYMENT_SUCCESS,
  PUT_PAYMENT_ERROR,
  DELETE_PAYMENT_REQUEST,
  DELETE_PAYMENT_SUCCESS,
  DELETE_PAYMENT_ERROR,
} from "./paymentActions";

const initialState = {
  paymentMethodList: [],
  isLoading: false,
  isSubmitting: false,
};

const paymentReducer = (state = initialState, action) => {
  switch (action.type) {
    /* REQUESTS */
    case BROWSE_PAYMENTS_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case POST_PAYMENT_REQUEST:
    case PUT_PAYMENT_REQUEST:
    case DELETE_PAYMENT_REQUEST: {
      return {
        ...state,
        isSubmitting: true,
      };
    }

    /* SUCCESSES */
    case BROWSE_PAYMENTS_SUCCESS: {
      return {
        ...state,
        paymentMethodList: action.payload.paymentMethodList,
        isLoading: false,
      };
    }
    case POST_PAYMENT_SUCCESS:
    case PUT_PAYMENT_SUCCESS:
    case DELETE_PAYMENT_SUCCESS: {
      return {
        ...state,
        isSubmitting: false,
      };
    }

    /* ERRORS */
    case BROWSE_PAYMENTS_ERROR: {
      return {
        ...state,
        paymentMethodList: [],
        isLoading: false,
      };
    }
    case POST_PAYMENT_ERROR:
    case PUT_PAYMENT_ERROR:
    case DELETE_PAYMENT_ERROR: {
      return {
        ...state,
        sSubmitting: false,
      };
    }

    default: {
      return state;
    }
  }
};

export default paymentReducer;
