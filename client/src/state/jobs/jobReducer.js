import {
  BROWSE_JOBS_REQUEST,
  BROWSE_JOBS_SUCCESS,
  BROWSE_JOBS_ERROR,
  BROWSE_CATEGORIES_REQUEST,
  BROWSE_CATEGORIES_SUCCESS,
  BROWSE_CATEGORIES_ERROR,
  POST_JOB_REQUEST,
  POST_JOB_SUCCESS,
  POST_JOB_ERROR,
} from "./jobActions";

const initialState = {
  jobsList: [],
  categoryList: [],
  isLoadingJobsList: false,
  isLoadingCategoryList: false,
  isSubmitting: false,
};

const jobReducer = (state = initialState, action) => {
  switch (action.type) {
    /* REQUESTS */
    case BROWSE_JOBS_REQUEST: {
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
        isSubmitting: true,
      };
    }

    /* SUCCESSES */
    case BROWSE_JOBS_SUCCESS: {
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
        job: action.payload.job,
        isSubmitting: false,
      };
    }

    /* ERRORS */
    case BROWSE_JOBS_ERROR: {
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
      };
    }

    default: {
      return state;
    }
  }
};

export default jobReducer;
