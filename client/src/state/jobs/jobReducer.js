/*
  This is just an example of what our reducers should look like.
  I still need to hook it up the back end.
*/

import {
  BROWSE_JOBS_REQUEST,
  BROWSE_JOBS_SUCCESS,
  BROWSE_JOBS_ERROR,
  POST_JOB_REQUEST,
  POST_JOB_SUCCESS,
  POST_JOB_ERROR,
} from "./jobActions";

const initialState = {
  jobsList: [],
  isLoading: false,
  isSubmitting: false,
};

const jobReducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    /* REQUESTS */
    case BROWSE_JOBS_REQUEST: {
      return {
        ...state,
        isLoading: true,
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
        isLoading: false,
      };
    }
    case POST_JOB_SUCCESS: {
      return {
        ...state,
        job: action.payload.job,
        isLoading: false,
      };
    }

    /* ERRORS */
    case BROWSE_JOBS_ERROR: {
      return {
        ...state,
        isLoading: false,
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
