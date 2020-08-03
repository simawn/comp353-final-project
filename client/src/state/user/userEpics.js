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
  GET_USER_REQUEST,
  getUserSuccess,
  getUserError,
  PUT_USER_REQUEST,
  putUserSuccess,
  putUserError,
  PUT_USER_SUBSCRIPTION_REQUEST,
  putUserSubscriptionSuccess,
  putUserSubscriptionError,
  DELETE_USER_REQUEST,
  deleteUserSuccess,
  deleteUserError,
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

const getUserEvent = (action$) => {
  return action$.pipe(
    ofType(GET_USER_REQUEST),
    mergeMap(({ payload: { userName } }) =>
      xhr("GET", `/users/${userName}`).pipe(
        map(({ response }) => getUserSuccess(response)),
        catchError((err) => {
          return of(getUserError(err));
        })
      )
    )
  );
};

const putUserEvent = (action$) => {
  return action$.pipe(
    ofType(PUT_USER_REQUEST),
    mergeMap(({ payload: { userInformation, userName } }) =>
      xhr("PUT", `/users/${userName}`, userInformation).pipe(
        map(({ response }) => putUserSuccess(response)),
        catchError((err) => {
          return of(putUserError(err));
        })
      )
    )
  );
};

const putUserSubscriptionEvent = (action$) => {
  return action$.pipe(
    ofType(PUT_USER_SUBSCRIPTION_REQUEST),
    mergeMap(({ payload: { subscriptionID, userName } }) =>
      xhr("PUT", `/users/${userName}/subscription/${subscriptionID}`).pipe(
        map(({ response }) => putUserSubscriptionSuccess(response)),
        catchError((err) => {
          return of(putUserSubscriptionError(err));
        })
      )
    )
  );
};

const deleteUserEvent = (action$) => {
  return action$.pipe(
    ofType(DELETE_USER_REQUEST),
    mergeMap(({ payload: { userName } }) =>
      xhr("DELETE", `/users/${userName}`).pipe(
        map(({ response }) => deleteUserSuccess(response)),
        catchError((err) => {
          return of(deleteUserError(err));
        })
      )
    )
  );
};

export default combineEpics(
  postUserEvent,
  postLoginEvent,
  postLogoutEvent,
  getUserEvent,
  putUserEvent,
  putUserSubscriptionEvent,
  deleteUserEvent
);
