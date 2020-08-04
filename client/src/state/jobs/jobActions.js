// REQUEST

export const BROWSE_JOBS_REQUEST = "BROWSE_JOBS_REQUEST";
export const browseJobsRequest = (dates) => {
  return {
    type: BROWSE_JOBS_REQUEST,
    payload: { dates },
  };
};

export const BROWSE_ALL_JOBS_REQUEST = "BROWSE_ALL_JOBS_REQUEST [ADMIN]";
export const browseAllJobsRequest = () => {
  return {
    type: BROWSE_ALL_JOBS_REQUEST,
  };
};

export const BROWSE_CATEGORIES_REQUEST = "BROWSE_CATEGORIES_REQUEST";
export const browseCategoriesRequest = () => {
  return {
    type: BROWSE_CATEGORIES_REQUEST,
  };
};

export const GET_EMPLOYER_JOBS_REQUEST = "GET_EMPLOYER_JOBS_REQUEST";
export const getEmployerJobsRequest = (userName) => {
  return {
    type: GET_EMPLOYER_JOBS_REQUEST,
    payload: { userName },
  };
};

export const GET_DATED_JOBS_REQUEST = "GET_DATED_JOBS_REQUEST";
export const getDatedJobsRequest = (startDate, endDate) => {
  return {
    type: GET_DATED_JOBS_REQUEST,
    payload: { startDate, endDate },
  };
};

export const POST_JOB_REQUEST = "POST_JOB_REQUEST";
export const postJobRequest = (jobInformation, userName) => {
  return {
    type: POST_JOB_REQUEST,
    payload: { jobInformation, userName },
  };
};

export const PUT_JOB_REQUEST = "PUT_JOB_REQUEST";
export const putJobRequest = (jobInformation, jobID) => {
  return {
    type: PUT_JOB_REQUEST,
    payload: { jobInformation, jobID },
  };
};

export const POST_CATEGORY_REQUEST = "POST_CATEGORY_REQUEST";
export const postCategoryRequest = (categoryName) => {
  return {
    type: POST_CATEGORY_REQUEST,
    payload: { categoryName },
  };
};

export const DELETE_JOB_REQUEST = "DELETE_JOB_REQUEST";
export const deleteJobRequest = (jobID) => {
  return {
    type: DELETE_JOB_REQUEST,
    payload: { jobID },
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

export const BROWSE_ALL_JOBS_SUCCESS = "BROWSE_ALL_JOBS_SUCCESS [ADMIN]";
export const browseAllJobsSuccess = (jobList) => {
  return {
    type: BROWSE_ALL_JOBS_SUCCESS,
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

export const GET_EMPLOYER_JOBS_SUCCESS = "GET_EMPLOYER_JOBS_SUCCESS";
export const getEmployerJobsSuccess = (jobList) => {
  return {
    type: GET_EMPLOYER_JOBS_SUCCESS,
    payload: { jobList },
  };
};

export const GET_DATED_JOBS_SUCCESS = "GET_DATED_JOBS_SUCCESS";
export const getDatedJobsSuccess = (jobList) => {
  return {
    type: GET_DATED_JOBS_SUCCESS,
    payload: { jobList },
  };
};

export const POST_JOB_SUCCESS = "POST_JOB_SUCCESS";
export const postJobSuccess = () => {
  return {
    type: POST_JOB_SUCCESS,
  };
};

export const PUT_JOB_SUCCESS = "PUT_JOB_SUCCESS";
export const putJobSuccess = () => {
  return {
    type: PUT_JOB_SUCCESS,
  };
};

export const POST_CATEGORY_SUCCESS = "POST_CATEGORY_SUCCESS";
export const postCategorySuccess = () => {
  return {
    type: POST_CATEGORY_SUCCESS,
  };
};

export const DELETE_JOB_SUCCESS = "DELETE_JOB_SUCCESS";
export const deleteJobSuccess = () => {
  return {
    type: DELETE_JOB_SUCCESS,
  };
};

// ERROR

export const BROWSE_JOBS_ERROR = "BROWSE_JOBS_ERROR";
export const browseJobsError = (error) => ({
  type: BROWSE_JOBS_ERROR,
  payload: { error },
});

export const BROWSE_ALL_JOBS_ERROR = "BROWSE_ALL_JOBS_ERROR [ADMIN]";
export const browseAllJobsError = (error) => {
  return {
    type: BROWSE_ALL_JOBS_ERROR,
    payload: { error },
  };
};

export const BROWSE_CATEGORIES_ERROR = "BROWSE_CATEGORIES_ERROR";
export const browseCategoriesError = (error) => {
  return {
    type: BROWSE_CATEGORIES_ERROR,
    payload: { error },
  };
};

export const GET_EMPLOYER_JOBS_ERROR = "GET_EMPLOYER_JOBS_ERROR";
export const getEmployerJobsError = (error) => {
  return {
    type: GET_EMPLOYER_JOBS_ERROR,
    payload: { error },
  };
};

export const GET_DATED_JOBS_ERROR = "GET_DATED_JOBS_ERROR";
export const getDatedJobsError = (error) => {
  return {
    type: GET_DATED_JOBS_ERROR,
    payload: { error },
  };
};

export const POST_JOB_ERROR = "POST_JOB_ERROR";
export const postJobError = (error) => ({
  type: POST_JOB_ERROR,
  payload: { error },
});

export const PUT_JOB_ERROR = "PUT_JOB_ERROR";
export const putJobError = (error) => {
  return {
    type: PUT_JOB_ERROR,
    payload: { error },
  };
};

export const POST_CATEGORY_ERROR = "POST_CATEGORY_ERROR";
export const postCategoryError = (error) => {
  return {
    type: POST_CATEGORY_ERROR,
    payload: { error },
  };
};

export const DELETE_JOB_ERROR = "DELETE_JOB_ERROR";
export const deleteJobError = (error) => ({
  type: DELETE_JOB_ERROR,
  payload: { error },
});
