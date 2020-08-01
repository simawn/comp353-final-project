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
  POST_JOB_REQUEST,
  postJobSuccess,
  postJobError,
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

const postJobEvent = (action$) => {
  return action$.pipe(
    ofType(POST_JOB_REQUEST),
    mergeMap(({ payload: { jobInformation } }) =>
      xhr("POST", `/jobs`, jobInformation).pipe(
        map((response) => postJobSuccess(response)),
        catchError((err) => {
          return of(postJobError(err));
        })
      )
    )
  );
};

export default combineEpics(browseJobsEvent, browseCategoriesEvent, postJobEvent);
