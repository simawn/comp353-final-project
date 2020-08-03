import {
  GET_APPLICANT_STATUS_REQUEST,
  GET_APPLICANT_STATUS_SUCCESS,
  GET_APPLICANT_STATUS_ERROR,
  GET_APPLICANTS_REQUEST,
  GET_APPLICANTS_SUCCESS,
  GET_APPLICANTS_ERROR,
  PUT_APPLICANT_STATUS_REQUEST,
  PUT_APPLICANT_STATUS_SUCCESS,
  PUT_APPLICANT_STATUS_ERROR,
  POST_APPLICATION_REQUEST,
  POST_APPLICATION_SUCCESS,
  POST_APPLICATION_ERROR,
} from "./applicantActions";

const initialState = {
  applicantStatusList: [],
  applicantList: [],
  isLoadingApplicantList: false,
  isLoadingApplicantStatusList: false,
  isSubmitting: false,
};

const applicantReducer = (state = initialState, action) => {
  switch (action.type) {
    /* REQUESTS */
    case GET_APPLICANT_STATUS_REQUEST: {
      return {
        ...state,
        isLoadingApplicantStatusList: true,
      };
    }
    case GET_APPLICANTS_REQUEST: {
      return {
        ...state,
        isLoadingApplicantList: true,
      };
    }
    case PUT_APPLICANT_STATUS_REQUEST:
    case POST_APPLICATION_REQUEST: {
      return {
        ...state,
        isSubmitting: true,
      };
    }

    /* SUCCESSES */
    case GET_APPLICANT_STATUS_SUCCESS: {
      return {
        ...state,
        applicantStatusList: action.payload.applicantStatuses,
        isLoadingApplicantStatusList: false,
      };
    }
    case GET_APPLICANTS_SUCCESS: {
      return {
        ...state,
        applicantList: action.payload.applicantList,
        isLoadingApplicantList: false,
      };
    }
    case PUT_APPLICANT_STATUS_SUCCESS:
    case POST_APPLICATION_SUCCESS: {
      return {
        ...state,
        isSubmitting: false,
      };
    }

    /* ERRORS */
    case GET_APPLICANT_STATUS_ERROR: {
      return {
        ...state,
        isLoadingApplicantStatusList: false,
      };
    }
    case GET_APPLICANTS_ERROR: {
      return {
        ...state,
        isLoadingApplicantList: false,
      };
    }
    case PUT_APPLICANT_STATUS_ERROR:
    case POST_APPLICATION_ERROR: {
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

export default applicantReducer;
