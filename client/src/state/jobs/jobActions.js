// REQUEST

export const BROWSE_JOBS_REQUEST = "BROWSE_JOBS_REQUEST";
export const browseJobsRequest = () => {
  return {
    type: BROWSE_JOBS_REQUEST,
  };
};

export const BROWSE_CATEGORIES_REQUEST = "BROWSE_CATEGORIES_REQUEST";
export const browseCategoriesRequest = () => {
  return {
    type: BROWSE_CATEGORIES_REQUEST,
  };
};

export const POST_JOB_REQUEST = "POST_JOB_REQUEST";
export const postJobRequest = (jobInformation) => {
  return {
    type: POST_JOB_REQUEST,
    payload: { jobInformation },
  };
};

// SUCCESS

export const BROWSE_JOBS_SUCCESS = "BROWSE_JOBS_SUCCESS";
export const browseJobsSuccess = (jobList) => {
  return {
    type: BROWSE_JOBS_SUCCESS,
    payload: { jobList },
  };
};

export const BROWSE_CATEGORIES_SUCCESS = "BROWSE_CATEGORIES_SUCCESS";
export const browseCategoriesSuccess = (categoryList) => {
  return {
    type: BROWSE_CATEGORIES_SUCCESS,
    payload: { categoryList },
  };
};

export const POST_JOB_SUCCESS = "POST_JOB_SUCCESS";
export const postJobSuccess = (job) => {
  return {
    type: POST_JOB_SUCCESS,
    payload: { job },
  };
};

// ERROR

export const BROWSE_JOBS_ERROR = "BROWSE_JOBS_ERROR";
export const browseJobsError = (error) => ({
  type: BROWSE_JOBS_ERROR,
  payload: { error },
});

export const BROWSE_CATEGORIES_ERROR = "BROWSE_CATEGORIES_ERROR";
export const browseCategoriesError = (error) => {
  return {
    type: BROWSE_CATEGORIES_ERROR,
    payload: { error },
  };
};

export const POST_JOB_ERROR = "POST_JOB_ERROR";
export const postJobError = (error) => ({
  type: POST_JOB_ERROR,
  payload: { error },
});
