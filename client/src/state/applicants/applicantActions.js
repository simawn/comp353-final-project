// REQUESTS

export const GET_APPLICANT_STATUS_REQUEST = "GET_APPLICANT_STATUS_REQUEST";
export const getApplicantStatusRequest = (userName) => {
  return {
    type: GET_APPLICANT_STATUS_REQUEST,
    payload: { userName },
  };
};

export const GET_APPLICANTS_REQUEST = "GET_APPLICANTS_REQUEST";
export const getApplicantsRequest = (jobID) => {
  return {
    type: GET_APPLICANTS_REQUEST,
    payload: { jobID },
  };
};

export const PUT_APPLICANT_STATUS_REQUEST = "PUT_APPLICANT_STATUS_REQUEST";
export const putApplicantStatusRequest = (userName, jobID, newStatus) => {
  return {
    type: PUT_APPLICANT_STATUS_REQUEST,
    payload: { userName, jobID, newStatus },
  };
};

export const POST_APPLICATION_REQUEST = "POST_APPLICATION_REQUEST";
export const postApplicationRequest = (userName, jobID) => {
  return {
    type: POST_APPLICATION_REQUEST,
    payload: { userName, jobID },
  };
};

// SUCCESSES

export const GET_APPLICANT_STATUS_SUCCESS = "GET_APPLICANT_STATUS_SUCCESS";
export const getApplicantStatusSuccess = (applicantStatuses) => {
  return {
    type: GET_APPLICANT_STATUS_SUCCESS,
    payload: { applicantStatuses },
  };
};

export const GET_APPLICANTS_SUCCESS = "GET_APPLICANTS_SUCCESS";
export const getApplicantsSuccess = (applicantList) => {
  return {
    type: GET_APPLICANTS_SUCCESS,
    payload: { applicantList },
  };
};

export const PUT_APPLICANT_STATUS_SUCCESS = "PUT_APPLICANT_STATUS_SUCCESS";
export const putApplicantStatusSuccess = () => {
  return {
    type: PUT_APPLICANT_STATUS_SUCCESS,
  };
};

export const POST_APPLICATION_SUCCESS = "POST_APPLICATION_SUCCESS";
export const postApplicationSuccess = () => {
  return {
    type: POST_APPLICATION_SUCCESS,
  };
};

// ERRORS

export const GET_APPLICANT_STATUS_ERROR = "GET_APPLICANT_STATUS_ERROR";
export const getApplicantStatusError = (error) => {
  return {
    type: GET_APPLICANT_STATUS_ERROR,
    payload: { error },
  };
};

export const GET_APPLICANTS_ERROR = "GET_APPLICANTS_ERROR";
export const getApplicantsError = (error) => {
  return {
    type: GET_APPLICANTS_ERROR,
    payload: { error },
  };
};

export const PUT_APPLICANT_STATUS_ERROR = "PUT_APPLICANT_STATUS_ERROR";
export const putApplicantStatusError = (error) => {
  return {
    type: PUT_APPLICANT_STATUS_ERROR,
    payload: { error },
  };
};

export const POST_APPLICATION_ERROR = "POST_APPLICATION_ERROR";
export const postApplicationError = (error) => {
  return {
    type: POST_APPLICATION_ERROR,
    payload: { error },
  };
};
