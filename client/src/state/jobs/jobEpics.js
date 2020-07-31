/* 
  This is just an example of what epics should look like.
  I still need to hook up the back end.
*/

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

export default combineEpics(browseJobsEvent, postJobEvent);
