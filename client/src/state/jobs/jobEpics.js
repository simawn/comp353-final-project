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
  BROWSE_JOBS_REQUEST,
  browseJobsSuccess,
  browseJobsError,
  BROWSE_CATEGORIES_REQUEST,
  browseCategoriesSuccess,
  browseCategoriesError,
  GET_EMPLOYER_JOBS_REQUEST,
  getEmployerJobsSuccess,
  getEmployerJobsError,
  POST_JOB_REQUEST,
  postJobSuccess,
  postJobError,
  PUT_JOB_REQUEST,
  putJobSuccess,
  putJobError,
  DELETE_JOB_REQUEST,
  deleteJobSuccess,
  deleteJobError,
  POST_CATEGORY_REQUEST,
  postCategorySuccess,
  postCategoryError,
} from "./jobActions";

const browseJobsEvent = (action$) => {
  return action$.pipe(
    ofType(BROWSE_JOBS_REQUEST),
    mergeMap(() =>
      xhr("GET", `/jobs`).pipe(
        map(({ response }) => browseJobsSuccess(response)),
        catchError((err) => {
          return of(browseJobsError(err));
        })
      )
    )
  );
};

const browseCategoriesEvent = (action$) => {
  return action$.pipe(
    ofType(BROWSE_CATEGORIES_REQUEST),
    mergeMap(() =>
      xhr("GET", `/jobs/categories`).pipe(
        map(({ response }) => browseCategoriesSuccess(response)),
        catchError((err) => {
          return of(browseCategoriesError(err));
        })
      )
    )
  );
};

const getEmployerJobsEvent = (action$) => {
  return action$.pipe(
    ofType(GET_EMPLOYER_JOBS_REQUEST),
    mergeMap(({ payload: { userName } }) =>
      xhr("GET", `/jobs/${userName}`).pipe(
        map(({ response }) => getEmployerJobsSuccess(response)),
        catchError((err) => {
          return of(getEmployerJobsError(err));
        })
      )
    )
  );
};

const postJobEvent = (action$) => {
  return action$.pipe(
    ofType(POST_JOB_REQUEST),
    mergeMap(({ payload: { jobInformation, userName } }) =>
      xhr("POST", `/jobs/${userName}`, jobInformation).pipe(
        map((response) => postJobSuccess(response)),
        catchError((err) => {
          return of(postJobError(err.response));
        })
      )
    )
  );
};

const putJobEvent = (action$) => {
  return action$.pipe(
    ofType(PUT_JOB_REQUEST),
    mergeMap(({ payload: { jobInformation, jobID } }) =>
      xhr("PUT", `/jobs/${jobID}`, jobInformation).pipe(
        map((response) => putJobSuccess(response)),
        catchError((err) => {
          return of(putJobError(err));
        })
      )
    )
  );
};

const deleteJobEvent = (action$) => {
  return action$.pipe(
    ofType(DELETE_JOB_REQUEST),
    mergeMap(({ payload: { jobID } }) =>
      xhr("DELETE", `/jobs/${jobID}`).pipe(
        map((response) => deleteJobSuccess(response)),
        catchError((err) => {
          return of(deleteJobError(err));
        })
      )
    )
  );
};

const postCategoryEvent = (action$) => {
  return action$.pipe(
    ofType(POST_CATEGORY_REQUEST),
    mergeMap(({ payload: { categoryName } }) =>
      xhr("POST", `/jobs/categories`, categoryName).pipe(
        map((response) => postCategorySuccess(response)),
        catchError((err) => {
          return of(postCategoryError(err));
        })
      )
    )
  );
};

export default combineEpics(
  browseJobsEvent,
  browseCategoriesEvent,
  getEmployerJobsEvent,
  postJobEvent,
  deleteJobEvent,
  postCategoryEvent,
  putJobEvent
);
