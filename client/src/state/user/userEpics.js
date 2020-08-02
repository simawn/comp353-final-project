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
  POST_USER_REQUEST,
  postUserSuccess,
  postUserError,
  POST_LOGIN_REQUEST,
  postLoginSuccess,
  postLoginError,
  POST_LOGOUT_REQUEST,
  postLogoutSuccess,
  postLogoutError,
} from "./userActions";

const postUserEvent = (action$) => {
  return action$.pipe(
    ofType(POST_USER_REQUEST),
    mergeMap(({ payload: { userInformation, withCreds } }) =>
      xhr("POST", `/register`, userInformation, withCreds).pipe(
        map(({ response }) => postUserSuccess(response)),
        catchError(({ response }) => {
          return of(postUserError(response));
        })
      )
    )
  );
};

const postLoginEvent = (action$) => {
  return action$.pipe(
    ofType(POST_LOGIN_REQUEST),
    mergeMap(({ payload: { userInformation, withCreds } }) =>
      xhr("POST", `/login`, userInformation, withCreds).pipe(
        map(({ response }) => postLoginSuccess(response)),
        catchError(({ response }) => {
          return of(postLoginError(response));
        })
      )
    )
  );
};

const postLogoutEvent = (action$) => {
  return action$.pipe(
    ofType(POST_LOGOUT_REQUEST),
    mergeMap(() =>
      xhr("POST", `/logout`).pipe(
        map(({ response }) => postLogoutSuccess(response)),
        catchError(({ response }) => {
          return of(postLogoutError(response));
        })
      )
    )
  );
};

export default combineEpics(postUserEvent, postLoginEvent, postLogoutEvent);
