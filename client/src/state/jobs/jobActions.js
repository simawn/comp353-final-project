/* 
  This is just an example of what actions should look like.
  I still need to hook up the back end.
*/

// REQUEST

export const BROWSE_JOBS_REQUEST = "BROWSE_JOBS_REQUEST";
export const browseJobsRequest = () => {
  return {
    type: BROWSE_JOBS_REQUEST,
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

export const POST_JOB_ERROR = "POST_JOB_ERROR";
export const postJobError = (error) => ({
  type: POST_JOB_ERROR,
  payload: { error },
});
