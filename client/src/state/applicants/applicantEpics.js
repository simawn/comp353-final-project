// RxJS Operators
import { catchError, mergeMap, map } from "rxjs/operators";
// Observable Helpers
import { of } from "rxjs/observable/of";
// RxJS Observable
import { combineEpics, ofType } from "redux-observable";
// Epic Helper
import xhr from "../epicHelper";

// Redux Actions
import {
  GET_APPLICANT_STATUS_REQUEST,
  getApplicantStatusSuccess,
  getApplicantStatusError,
  PUT_APPLICANT_STATUS_REQUEST,
  putApplicantStatusSuccess,
  putApplicantStatusError,
  POST_APPLICATION_REQUEST,
  postApplicationSuccess,
  postApplicationError,
} from "./applicantActions";

const getApplicantStatusesEvent = (action$) => {
  return action$.pipe(
    ofType(GET_APPLICANT_STATUS_REQUEST),
    mergeMap(({ payload: { userName } }) =>
      xhr("GET", `/applicants/${userName}`).pipe(
        map(({ response }) => getApplicantStatusSuccess(response)),
        catchError((err) => {
          return of(getApplicantStatusError(err));
        })
      )
    )
  );
};

const putApplicantStatusEvent = (action$) => {
  return action$.pipe(
    ofType(PUT_APPLICANT_STATUS_REQUEST),
    mergeMap(({ payload: { userName, jobID, newStatus } }) =>
      xhr("PUT", `/applicants/${userName}/listing/${jobID}/status/${newStatus}`).pipe(
        map((response) => putApplicantStatusSuccess(response)),
        catchError((err) => {
          return of(putApplicantStatusError(err));
        })
      )
    )
  );
};

const postApplicationEvent = (action$) => {
  return action$.pipe(
    ofType(POST_APPLICATION_REQUEST),
    mergeMap(({ payload: { userName, jobID } }) =>
      xhr("POST", `/applicants/${userName}/listing/${jobID}`).pipe(
        map((response) => postApplicationSuccess(response)),
        catchError((err) => {
          return of(postApplicationError(err));
        })
      )
    )
  );
};

export default combineEpics(getApplicantStatusesEvent, putApplicantStatusEvent, postApplicationEvent);
