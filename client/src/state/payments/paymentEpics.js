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
  BROWSE_PAYMENTS_REQUEST,
  browsePaymentSuccess,
  browsePaymentError,
  POST_PAYMENT_REQUEST,
  postPaymentSuccess,
  postPaymentError,
  PUT_PAYMENT_REQUEST,
  putPaymentSuccess,
  putPaymentError,
  DELETE_PAYMENT_REQUEST,
  deletePaymentSuccess,
  deletePaymentError,
} from "./paymentActions";

const browsePaymentsEvent = (action$) => {
  return action$.pipe(
    ofType(BROWSE_PAYMENTS_REQUEST),
    mergeMap(({ payload: { userName } }) =>
      xhr("GET", `/payments/${userName}`).pipe(
        map(({ response }) => browsePaymentSuccess(response)),
        catchError(({ response }) => {
          return of(browsePaymentError(response));
        })
      )
    )
  );
};

const postPaymentEvent = (action$) => {
  return action$.pipe(
    ofType(POST_PAYMENT_REQUEST),
    mergeMap(({ payload: { paymentInformation, userName } }) =>
      xhr("POST", `/payments/${userName}`, paymentInformation).pipe(
        map(({ response }) => postPaymentSuccess(response)),
        catchError(({ response }) => {
          return of(postPaymentError(response));
        })
      )
    )
  );
};

const putPaymentEvent = (action$) => {
  return action$.pipe(
    ofType(PUT_PAYMENT_REQUEST),
    mergeMap(({ payload: { paymentInformation, paymentID } }) =>
      xhr("PUT", `/payments/${paymentID}`, paymentInformation).pipe(
        map(({ response }) => putPaymentSuccess(response)),
        catchError(({ response }) => {
          return of(putPaymentError(response));
        })
      )
    )
  );
};

const deletePaymentEvent = (action$) => {
  return action$.pipe(
    ofType(DELETE_PAYMENT_REQUEST),
    mergeMap(({ payload: { paymentID } }) =>
      xhr("DELETE", `/payments/${paymentID}`).pipe(
        map(({ response }) => deletePaymentSuccess(response)),
        catchError((err) => {
          return of(deletePaymentError(err));
        })
      )
    )
  );
};

export default combineEpics(browsePaymentsEvent, postPaymentEvent, putPaymentEvent, deletePaymentEvent);
