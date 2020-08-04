import {
  BROWSE_JOBS_REQUEST,
  BROWSE_JOBS_SUCCESS,
  BROWSE_JOBS_ERROR,
  BROWSE_ALL_JOBS_REQUEST,
  BROWSE_ALL_JOBS_SUCCESS,
  BROWSE_ALL_JOBS_ERROR,
  BROWSE_CATEGORIES_REQUEST,
  BROWSE_CATEGORIES_SUCCESS,
  BROWSE_CATEGORIES_ERROR,
  GET_EMPLOYER_JOBS_REQUEST,
  GET_EMPLOYER_JOBS_SUCCESS,
  GET_EMPLOYER_JOBS_ERROR,
  GET_DATED_JOBS_REQUEST,
  GET_DATED_JOBS_SUCCESS,
  GET_DATED_JOBS_ERROR,
  POST_JOB_REQUEST,
  POST_JOB_SUCCESS,
  POST_JOB_ERROR,
  PUT_JOB_REQUEST,
  PUT_JOB_SUCCESS,
  PUT_JOB_ERROR,
  DELETE_JOB_REQUEST,
  DELETE_JOB_SUCCESS,
  DELETE_JOB_ERROR,
  POST_CATEGORY_REQUEST,
  POST_CATEGORY_SUCCESS,
  POST_CATEGORY_ERROR,
} from "./jobActions";

const initialState = {
  jobsList: [],
  categoryList: [],
  atJobLimit: false,
  isLoadingJobsList: false,
  isLoadingCategoryList: false,
  isSubmitting: false,
};

const jobReducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    /* REQUESTS */
    case BROWSE_JOBS_REQUEST:
    case BROWSE_ALL_JOBS_REQUEST:
    case GET_EMPLOYER_JOBS_REQUEST:
    case GET_DATED_JOBS_REQUEST: {
      return {
        ...state,
        isLoadingJobs: true,
      };
    }
    case BROWSE_CATEGORIES_REQUEST: {
      return {
        ...state,
        isLoadingCategoryList: false,
      };
    }
    case POST_JOB_REQUEST: {
      return {
        ...state,
        atJobLimit: false,
        isSubmitting: true,
      };
    }
    case PUT_JOB_REQUEST:
    case DELETE_JOB_REQUEST:
    case POST_CATEGORY_REQUEST: {
      return {
        ...state,
        isSubmitting: true,
      };
    }

    /* SUCCESSES */
    case BROWSE_JOBS_SUCCESS:
    case BROWSE_ALL_JOBS_SUCCESS:
    case GET_EMPLOYER_JOBS_SUCCESS:
    case GET_DATED_JOBS_SUCCESS: {
      return {
        ...state,
        jobsList: action.payload.jobList,
        isLoadingJobs: false,
      };
    }
    case BROWSE_CATEGORIES_SUCCESS: {
      return {
        ...state,
        categoryList: action.payload.categoryList,
        isLoadingCategoryList: false,
      };
    }
    case POST_JOB_SUCCESS: {
      return {
        ...state,
        atJobLimit: false,
        isSubmitting: false,
      };
    }
    case PUT_JOB_SUCCESS:
    case DELETE_JOB_SUCCESS:
    case POST_CATEGORY_SUCCESS: {
      return {
        ...state,
        isSubmitting: false,
      };
    }

    /* ERRORS */
    case BROWSE_JOBS_ERROR:
    case BROWSE_ALL_JOBS_ERROR:
    case GET_EMPLOYER_JOBS_ERROR:
    case GET_DATED_JOBS_ERROR: {
      return {
        ...state,
        isLoadingJobs: false,
      };
    }
    case BROWSE_CATEGORIES_ERROR: {
      return {
        ...state,
        isLoadingCategoryList: false,
      };
    }
    case POST_JOB_ERROR: {
      return {
        ...state,
        isSubmitting: false,
        atJobLimit: true,
      };
    }
    case PUT_JOB_ERROR:
    case DELETE_JOB_ERROR:
    case POST_CATEGORY_ERROR: {
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

export default jobReducer;
