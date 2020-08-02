import { createSelector } from "reselect";

const userStateSelector = (state) => state.userReducer;

export const currentUserSelector = createSelector([userStateSelector], (userState) => userState.currentUser);

export const userSnackBarInformationSelector = createSelector(
  [userStateSelector],
  (userState) => userState.snackBarInformation
);

export const userIsSubmittingSelector = createSelector([userStateSelector], (userState) => userState.isSubmitting);

export const userIsLoadingSelector = createSelector([userStateSelector], (userState) => userState.isSubmitting);

export const userSuccessfulLoginSelector = createSelector(
  [userStateSelector],
  (userState) => userState.successfulLogin
);
